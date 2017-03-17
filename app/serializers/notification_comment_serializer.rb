class NotificationCommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :authorized, :creator_name

  def initialize object, options={}
    super
    @current_user = options[:current_user] || {}
    @current_ability = Ability.new @current_user
  end

  def authorized
    {
      edit: @current_ability.can?(:update, object),
      delete: @current_ability.can?(:destroy, object),
    }
  end

  def creator_name
    object.creator.name
  end

  def created_at
    I18n.l object.created_at, format: :without_second
  end
end
