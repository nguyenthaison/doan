class NotificationNoteSerializer < ActiveModel::Serializer
  attributes :id, :content, :authorized, :created_at

  def initialize object, options={}
    super
    @current_user = options[:current_user] || {}
    @current_ability = Ability.new @current_user
  end

  def created_at
    I18n.l object.created_at, format: :without_second
  end

  def authorized
    {
      edit: @current_ability.can?(:update, object),
      delete: @current_ability.can?(:destroy, object)
    }
  end
end
