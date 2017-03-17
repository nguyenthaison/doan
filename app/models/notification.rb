class Notification < ActiveRecord::Base
  include SmartAsJson
  include Userstamp

  enum priority: %i[low medium high]
  ATTRIBUTE_PARAMS = [:title, :content,
    :priority, :start_date, :end_date, team_ids: [], attachment_ids: [],
    client_notification_lines_attributes: [:id, :client_id, :line_id],
    notification_tags_attributes: [:id, :tag_id, :parent_tag_id]]

  JOIN_TABLES = [:attachments, :notification_notes]
  ALLOWED_METHODS = [:has_note, :status_in_top]

  belongs_to :field

  has_many :client_notification_lines, dependent: :destroy
  has_many :clients, through: :client_notification_lines
  has_many :lines, through: :client_notification_lines
  has_many :notification_tags, dependent: :destroy
  has_many :tags, through: :notification_tags
  has_many :parent_tags, through: :notification_tags
  has_many :notification_teams, dependent: :destroy
  has_many :teams, through: :notification_teams
  has_many :attachments, as: :attachmentable, dependent: :destroy
  has_many :notification_notes, dependent: :destroy
  has_many :notification_users, dependent: :destroy
  has_many :users, through: :notification_users
  has_many :comments, as: :commentable, dependent: :destroy

  validates :title, presence: true, length: {maximum: 100}
  validates :content, presence: true, length: {maximum: 2000}
  validates :priority, :start_date, :end_date, presence: true
  validate :need_teams
  validate :start_date_can_not_less_than_current_date, unless: proc {id}
  validate :start_date_must_be_before_or_equal_end_date

  scope :active, -> do
    where "start_date <= :current_date AND end_date >= :current_date",
      current_date: Time.now.to_date
  end

  scope :filter_by_teams, -> team_ids do
    joins(:notification_teams).where "team_id IN (?)", team_ids
  end

  scope :out_of_date, -> do
    where "start_date <= ?", Time.now.to_date - 4.days
  end

  accepts_nested_attributes_for :client_notification_lines
  accepts_nested_attributes_for :notification_tags

  def json_data options={}, current_user
    options[:include] ||= {}

    show_readed_button =
      notification_teams.find_by(team_id: current_user.team_id) && current_user.id != self.creator_id ? true : false
    authorized = {
      add_note: current_user.can?(:add_note, self),
      edit: current_user.can?(:edit, self),
      delete: current_user.can?(:destroy, self),
      readed: show_readed_button
    }

    readed = check_readed current_user
    options = options.merge current_user: current_user
    as_json(options).merge({
      comments: comments.map {|comment| NotificationCommentSerializer.new(comment, {current_user: current_user})},
      authorized: authorized,
      notes: notification_notes.map {|notification_note|
        NotificationNoteSerializer.new notification_note, {current_user: current_user}},
      readed: readed,
      count_readed_users: notification_users.size,
      count_received_users: teams.includes(:users).map{|team| team.users.size}.sum
    })
  end

  def has_note
    notification_notes.size > 0 ? true : false
  end

  def status_in_top
    current_date = Time.now.to_date
    return {
      new: current_date - start_date < 3,
      warning: current_date - start_date >= 3
    }
  end

  def check_readed current_user
    notification_users.find_by(user_id: current_user) ? true : false
  end

  def notice_user current_user
    return [] unless current_user

    notice_users = current_user.notification_users
    notice_users.find_by notification_id: self.id
  end

  def as_json options={}
    super(options).merge({
      readed: check_readed(options[:current_user]),
      notice_user: notice_user(options[:current_user]),
    })
  end

  class << self
    def search_by params, user, field_id
      search_info = params[:search_query] || {}
      notifications = Notification.includes(Notification::JOIN_TABLES).all
      order_by = params[:order_by] || "id"

      filter = params[:filter] || {}
      filter.each do |key, value|
        notifications = notifications.where("#{key} = ?", value) if value.present?
      end

      if search_info["lines"] || search_info["clients"]
        notifications = notifications.joins(:client_notification_lines).where("line_id IN (?) OR client_id IN (?)",
          search_info["lines"], search_info["clients"]).uniq
      end

      if search_info["child_tags"] || search_info["parent_tags"]
        notifications = notifications.joins(:notification_tags).where("tag_id IN (?) OR parent_tag_id IN (?)",
          search_info["child_tags"], search_info["parent_tags"]).uniq
      end

      if search_info["teams"]
        notifications = notifications.joins(:notification_teams).where("team_id IN (?)",
          search_info["teams"]).uniq
      end

      if search_info["time_range"]
        start_date = Date.parse search_info["time_range"]["start_date"] if search_info["time_range"]["start_date"]
        end_date = Date.parse search_info["time_range"]["end_date"] if search_info["time_range"]["end_date"]

        if start_date
          notifications = notifications.where "end_date >= ?", start_date
        end

        if end_date
          notifications = notifications.where "start_date <= ?", end_date
        end
      end

      if search_info["query"]
        like_query = build_like_query search_info["query"]
        notifications = notifications.where like_query
      end

      if params[:in_top]
        notifications = notifications.active
      end

      if params[:filter_team] == "my_team"
        team_id = user.team ? user.team.id : nil
        notifications = notifications.filter_by_teams [team_id]
      end

      if params[:filter_team] == "other_team"
        team_id = user.team ? user.team.id : nil
        field = Field.find_by_id field_id
        other_team_ids = field.team_ids - [team_id]

        notifications = notifications.filter_by_teams other_team_ids
      end

      total_result = notifications.count
      [total_result, notifications.order(order_by).limit(params[:take])]
    end

    private
    def build_like_query value
      value = value.squish.gsub /( and )|( or )/i, " and " => "and", " or " => "or"
      value = value.gsub /\s/, "and"
      query_array = value.split /(and)|(or)/i
      query_array.pop if ["and", "or"].include? query_array.last.downcase unless query_array.empty?

      query_array = query_array.map do |child_query|
        ["and", "or"].include?(child_query.downcase) ? child_query :
          "(#{sub_query_for_text_search(child_query)})"
      end
      query_array.join
    end

    def sub_query_for_text_search query
      query = query || ""
      like_query = "%#{sanitize_sql_like query.strip}%"
      sql_query = sanitize_sql_array ["notifications.id = :query OR title LIKE :like_query OR content LIKE :like_query",
        query: query, like_query: like_query]
      sql_query
    end
  end

  private
  def need_teams
    errors.add :team, I18n.t("notifications.errors.need_teams") if
      self.teams.blank?
  end

  def start_date_must_be_before_or_equal_end_date
    if start_date && end_date && start_date > end_date
      errors.add :start_date, I18n.t("notifications.errors.start_must_before_end_date")
    end
  end

  def start_date_can_not_less_than_current_date
    if start_date && start_date < Time.now.to_date
      errors.add :start_date, I18n.t("notifications.errors.start_must_more_than_or_equal_current_date")
    end
  end
end
