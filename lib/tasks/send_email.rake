desc "Send email every day"
task send_email_about_unreaded_notification_users: :environment do
  SendUnreadNotificationEmailService.send_unread_notification_email
end
