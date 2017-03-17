require File.expand_path(File.dirname(__FILE__) + "/environment")

every :day, at: "10pm" do
  rake "clean_temp_files"
end

time_sent_mail  = ENV["SEND_MAIL_UNREAD_NOTIFICATION_FREQUENCY_IN_MINUTE"] ?
  ENV["SEND_MAIL_UNREAD_NOTIFICATION_FREQUENCY_IN_MINUTE"].to_i : 10

every time_sent_mail.minutes do
  rake "send_email_about_unreaded_notification_users"
end

every 1.hours do
  rake "db:feeds"
end
