Rails.application.configure do
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.perform_deliveries = true
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.default charset: "utf-8"
  config.action_mailer.smtp_settings = {
    user_name: ENV["MAIL_USERNAME"],
    password: ENV["MAIL_PASSWORD"],
    address: ENV["MAIL_HOST"],
    domain: ENV["MAIL_HOST"],
    port: ENV["MAIL_PORT"],
    authentication: ENV["MAIL_AUTHENTICATION"],
    enable_starttls_auto: true
  }
end
