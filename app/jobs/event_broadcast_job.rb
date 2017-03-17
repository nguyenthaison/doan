class EventBroadcastJob < ApplicationJob
  queue_as :default

  def perform help, current_user
    field = Field.find help.field_id
    json_help = help.json_data.to_json
    list_admin = User.where(role: "admin", company_id: current_user.company_id)
    list_member = help.user.admin? ? field.users :
      User.user_receive_notice(help.user.team_id, field.id)
    list_member.each do |member|
      notice_number = filter_help_by_user(help, member).size
      ActionCable.server.broadcast "#{member.id}_channel_#{Rails.env}",
        {notice: notice_number, help: json_help}
    end
    list_admin.each do |admin|
      notice_number = filter_help_by_user(help, admin).size
      ActionCable.server.broadcast "#{admin.id}_channel_#{Rails.env}",
        {notice: notice_number, help: json_help}
    end
  end

  def filter_help_by_user help, user
    helps = Help.help_active(help.field_id)
    return helps if user.admin?

    team_ids = user.notification_addresses.joins(:notification_address_teams).distinct.pluck(:team_id)
    helps = Help.help_active(help.field_id).joins(:user).where("users.team_id IS NULL OR
      users.team_id IN (?)", team_ids)
  end
end
