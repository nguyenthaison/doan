class ApplicationMailer < ActionMailer::Base
  default from: ENV["EMAIL_SERVER_ADDRESS"]
  layout "mailer"
end
