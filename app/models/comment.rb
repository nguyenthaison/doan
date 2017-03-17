class Comment < ActiveRecord::Base
  include Userstamp
  include SmartAsJson

  default_scope {order created_at: :desc}

  ATTRIBUTES_PARAMS = [:content, :commentable_id, :commentable_type ,attachment_ids: []]
  auto_strip_attributes :content, nullify: false
  acts_as_paranoid

  belongs_to :commentable, polymorphic: true

  has_many :attachments, as: :attachmentable, dependent: :destroy
  has_many :comment_users, dependent: :destroy
  has_many :user_activities

  validates :content, presence: true, length: {maximum: 2000}
  validates :commentable_id, :commentable_type, presence: true

  def update_votes current_user
    comment_user = CommentUser.
      find_or_create_by user_id: current_user.id, comment_id: id

    transaction do
      comment_user.update_attribute :vote, !comment_user.vote
      new_votes = comment_user.vote ? votes + 1 : votes - 1
      update_attribute :votes, new_votes
      reaction = {id: id, is_vote: comment_user.vote, votes: votes}
    end
  end

  def create_user_activity current_user
    if self.commentable_type === "Community"
      UserActivity.create community_id: self.commentable.id, user_id: current_user.id,
        activity_type: "Comment", comment_id: self.id
    end
  end
end
