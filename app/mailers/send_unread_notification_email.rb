class SendUnreadNotificationEmail < ApplicationMailer
  def send_unread_notification_email infor_email
    receiver_email = infor_email[:email]
    @teams = infor_email[:teams]
    subject = "[#{infor_email[:field_name]}] " +
      "#{I18n.l Time.now.to_date, format: I18n.t('time.formats.in_mail')} " +
      t("email.unread_notification_users.subject")

    mail to: receiver_email, subject: subject
  end
end
