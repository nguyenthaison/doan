class Faquestion < ActiveRecord::Base
  include SmartAsJson
  include BaseFaq
  include Userstamp

  enum priority: %i[low medium high]
  acts_as_paranoid
  auto_strip_attributes :title, :question, :answer, nullify: false

  attr_accessor :answer_attachment_ids

  FAQUESTION_ATTRIBUTES_PARAMS = [:title, :question, :user_id, :field_id,
    :answer, :priority, :big_trouble_id, :medium_trouble_id, :small_trouble_id,
    :tiny_trouble_id, :community_id, answer_attachment_ids: [], team_ids: [],
    attachment_ids: [], client_faquestion_lines_attributes: [:id, :client_id, :line_id],
    faquestion_tags_attributes: [:id, :tag_id, :parent_tag_id]]
  JOIN_TABLES = [:attachments, :faquestion_users]
  ALLOWED_METHODS = [:authorized, :faq_user, :like_num]

  belongs_to :big_trouble, class_name: Trouble.name, foreign_key: "big_trouble_id"
  belongs_to :medium_trouble, class_name: Trouble.name, foreign_key: "medium_trouble_id"
  belongs_to :small_trouble, class_name: Trouble.name, foreign_key: "small_trouble_id"
  belongs_to :tiny_trouble, class_name: Trouble.name, foreign_key: "tiny_trouble_id"
  belongs_to :community
  belongs_to :field

  has_many :faquestion_users, dependent: :destroy
  has_many :faquestion_tags, dependent: :destroy
  has_many :tags, through: :faquestion_tags
  has_many :parent_tags, through: :faquestion_tags
  has_many :lines, through: :client_faquestion_lines
  has_many :clients, through: :client_faquestion_lines
  has_many :attachments, as: :attachmentable, dependent: :destroy
  has_many :client_faquestion_lines, dependent: :destroy
  has_many :faquestion_teams, dependent: :destroy
  has_many :teams, through: :faquestion_teams

  has_many :answer_attachments, -> {where(attachmentable_type: "answer")},
    class_name: Attachment.name, foreign_key: "attachmentable_id"

  validates :title, presence: true, length: {maximum: 100}
  validates :question, presence: true, length: {maximum: 2000}
  validates :answer, presence: true, length: {maximum: 2000}
  validates :priority, presence: true
  validate :need_teams

  accepts_nested_attributes_for :client_faquestion_lines
  accepts_nested_attributes_for :faquestion_tags

  after_save :update_answer_attachments

  scope :filter_by_favorited, -> user_id do
    joins(:faquestion_users).where "faquestion_users.favorite = ? AND
      faquestion_users.user_id = ?", 1, user_id
  end

  def update_views current_user
    return if current_user == self.creator
    faq_user = FaquestionUser.find_by user_id: current_user, faquestion_id: id
    if faq_user
      faq_user.update_attributes view: true unless faq_user.view
    else
      FaquestionUser.create user_id: current_user.id, faquestion_id: id, view: true
    end

    self.update_column :views, views + 1
  end

  def faq_user current_user
    faquestion_users = current_user.faquestion_users
    faquestion_users.find_by faquestion_id: self.id
  end

  private
  def need_teams
    if self.teams.blank?
      errors.add :team, I18n.t("faquestions.errors.need_teams")
    end
  end

  def update_answer_attachments
    if self.answer_attachment_ids.present?
      current_ids = self.answer_attachments.pluck(:id).map {|id| id.to_s}
      not_change_ids = current_ids & answer_attachment_ids
      add_more_ids = answer_attachment_ids - not_change_ids
      remove_ids = current_ids - not_change_ids

      Attachment.where("id IN (?)" , add_more_ids).
        update_all attachmentable_id: id, attachmentable_type: "answer"

      Attachment.where("id IN (?)" , remove_ids).
        update_all attachmentable_id: nil
    end
  end
end
