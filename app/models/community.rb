class Community < ActiveRecord::Base
  include SmartAsJson
  include BaseFaq
  include Userstamp

  enum priority: %i[low medium high]
  acts_as_paranoid
  auto_strip_attributes :title, :question, nullify: false

  COMMUNITY_ATTRIBUTES_PARAMS = [:title, :question, :user_id,
    :priority, :big_trouble_id, :medium_trouble_id, :small_trouble_id,
    :tiny_trouble_id, team_ids: [], attachment_ids: [],
    client_community_lines_attributes: [:id, :client_id, :line_id],
    community_tags_attributes: [:id, :tag_id, :parent_tag_id]]
  JOIN_TABLES = [:attachments, :community_users]
  ALLOWED_METHODS = [:authorized, :faq_user, :like_num]

  belongs_to :big_trouble, class_name: Trouble.name, foreign_key: "big_trouble_id"
  belongs_to :medium_trouble, class_name: Trouble.name, foreign_key: "medium_trouble_id"
  belongs_to :small_trouble, class_name: Trouble.name, foreign_key: "small_trouble_id"
  belongs_to :tiny_trouble, class_name: Trouble.name, foreign_key: "tiny_trouble_id"
  belongs_to :client
  belongs_to :field

  has_one :faquestion

  has_many :comments, as: :commentable, dependent: :destroy
  has_many :community_tags, dependent: :destroy
  has_many :community_users, dependent: :destroy
  has_many :tags, through: :community_tags
  has_many :parent_tags, through: :community_tags
  has_many :lines, through: :client_community_lines
  has_many :clients, through: :client_community_lines
  has_many :attachments, as: :attachmentable, dependent: :destroy
  has_many :client_community_lines, dependent: :destroy
  has_many :community_teams, dependent: :destroy
  has_many :teams, through: :community_teams
  has_many :user_activities

  validates :title, presence: true, length: {maximum: 100}
  validates :question, presence: true, length: {maximum: 2000}
  validates :priority, presence: true
  validate :need_teams

  accepts_nested_attributes_for :client_community_lines
  accepts_nested_attributes_for :community_tags

  scope :filter_by_favorited, -> user_id do
    joins(:community_users).where "community_users.favorite = ? AND
      community_users.user_id = ?", 1, user_id
  end

  def update_views current_user
    return if current_user == self.creator
    community_user = CommunityUser.find_by user_id: current_user, community_id: id
    if community_user
      community_user.update_attributes view: true unless community_user.view
    else
      CommunityUser.create user_id: current_user.id, community_id: id, view: true
    end

    self.update_column :views, views + 1
  end

  def faq_user current_user
    community_users = current_user.community_users
    community_users.find_by community_id: self.id
  end

  def create_user_activity current_user
    UserActivity.create community_id: self.id, user_id: current_user.id,
      activity_type: "Community"
  end

  class << self
    def find_faquestion_user faq, faquestion_users
      faq_user = faquestion_users.detect{|faq_user| faq_user.community_id == faq.id}
    end
  end

  private
  def need_teams
    errors.add :team, I18n.t("communities.errors.need_teams") if
      self.teams.blank?
  end
end
