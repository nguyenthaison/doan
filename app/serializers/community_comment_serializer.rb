class CommunityCommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :votes, :created_at,
    :is_vote, :authorized, :creator_name, :allow_like

  has_many :attachments

  def initialize object, options={}
    super
    @current_user = options[:current_user] || {}
    @current_ability = Ability.new @current_user
  end

  def authorized
    {
      edit: @current_ability.can?(:update, object),
      delete: @current_ability.can?(:destroy, object),
      like: @current_ability.can?(:update_reaction, object),
      move_faq: @current_ability.can?(:create, Faquestion)
    }
  end

  def is_vote
    comment_user = object.comment_users.where(user_id: @current_user.id).first
    comment_user ? comment_user.vote : false
  end

  def creator_name
    object.creator.name
  end

  def created_at
    I18n.l object.created_at, format: :default
  end

  def allow_like
    @current_user.id != object.creator_id
  end
end
