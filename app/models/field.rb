class Field < ActiveRecord::Base
  include SmartAsJson
  include Search
  include Userstamp

  attr_accessor :small_attachment_ids

  ATTRIBUTE_PARAMS = [:name, :contract_start_date, :contract_end_date, :company_id, :style,
    rss_sources_attributes: [:id, :url, :title, :_destroy], attachment_ids: [],
    small_attachment_ids: []]
  ALLOWED_METHODS = [:team_num, :user_num, :contract_period, :is_valid]
  acts_as_paranoid
  enum style: [:blue, :green, :pink]

  belongs_to :company
  has_one :root_folder, class_name: Folder.name, foreign_key: "field_id"

  has_many :teams
  has_many :users, through: :teams
  has_many :rss_sources, dependent: :destroy
  has_many :troubles, dependent: :destroy
  has_many :trouble_names, dependent: :destroy
  has_many :steps, dependent: :destroy
  has_many :tags, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :notification_addresses, dependent: :destroy
  has_many :lines, dependent: :destroy
  has_many :faquestions, dependent: :destroy
  has_many :communities, dependent: :destroy
  has_many :clients, dependent: :destroy
  has_many :attachments, as: :attachmentable, dependent: :destroy
  has_many :small_attachments, -> {where(attachmentable_type: "small")},
    class_name: Attachment.name, foreign_key: "attachmentable_id"

  validates :name, presence: true, length: {maximum: 40}
  validates :contract_start_date, presence: true
  validate :start_date_must_be_before_or_equal_end_date

  after_create :create_default_step_navigation, :create_trouble_name
  after_destroy :release_team, prepend: true

  accepts_nested_attributes_for :rss_sources, allow_destroy: true

  after_save :update_small_attachments
  after_create :create_root_folder

  scope :filter_by_ids, -> ids do
    where("id IN (?)", JSON.parse(ids)) | has_no_field
  end

  scope :has_no_field, -> do
    where.not "id IN (?)", Field.ids
  end

  scope :active, -> do
    where "contract_start_date <= :current_date AND (contract_end_date IS NULL OR
      contract_end_date >= :current_date)", current_date: Time.now.to_date
  end

  def user_num
    self.users.count
  end

  def team_num
    self.teams.count
  end

  def is_valid
    time_valid = contract_start_date <= Time.now.to_date &&
      (!contract_end_date || contract_end_date >= Time.now.to_date)

    time_valid
  end

  def start_date_must_be_before_or_equal_end_date
    if contract_start_date && contract_end_date && contract_start_date > contract_end_date
      errors.add :contract_start_date, I18n.t("companies.errors.start_must_before_end_date")
    end
  end

  private
  def create_root_folder
    Folder.create name: I18n.t("manual_files.default_name"), field_id: self.id
    BookmarkFolder.create name: I18n.t("bookmarks.default_name"), field_id: self.id
  end

  def release_team
    Team.clear_field self.teams
  end

  def create_default_step_navigation
    Step.create_default_step_navigation self.id
  end

  def create_trouble_name
    TroubleName.create [
      {key: "big_trouble", name: "big trouble", field_id: self.id},
      {key: "medium_trouble",name: "medium trouble", field_id: self.id},
      {key: "small_trouble", name: "small trouble", field_id: self.id},
      {key: "tiny_trouble", name: "tiny trouble", field_id: self.id},
    ]
  end

  def update_small_attachments
    if self.small_attachment_ids.present?
      current_ids = self.small_attachments.pluck(:id).map {|id| id.to_s}
      not_change_ids = current_ids & small_attachment_ids
      add_more_ids = small_attachment_ids - not_change_ids
      remove_ids = current_ids - not_change_ids

      Attachment.where("id IN (?)" , add_more_ids).
        update_all attachmentable_id: id, attachmentable_type: "small"

      Attachment.where("id IN (?)" , remove_ids).
        update_all attachmentable_id: nil
    end
  end

  class << self
    def update_team params, field
      team_ids = params[:field][:team_ids]
      Team.update_field_id team_ids, field
    end

    def search_by_query query
      fields = {id: "eq", name: "like"}
      search_follow_field query, fields
    end
  end
end
