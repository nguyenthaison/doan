class SendUnreadNotificationEmailService
  class << self
    def send_unread_notification_email
      email_list = generate_email_list

      email_list.each do |email|
        if email[:email].present? && email[:teams].size > 0
          SendUnreadNotificationEmail.send_unread_notification_email(email).deliver
        end
      end
    end

    def generate_email_list
      notify_addresses = NotificationAddress.notifications
      email_infor_list = []

      notify_addresses.each do |notify_address|
        email_infor_list << generate_notify_address(notify_address)
      end

      email_infor_list
    end

    def generate_notify_address notify_address
      teams = notify_address.teams

      notify_address = {
        email: notify_address.user.email,
        field_name: notify_address.field.name,
        teams: generate_teams(teams)
      }

      notify_address
    end

    def generate_teams teams
      results = []

      teams.each do |team|
        notifications = team.notifications.active.out_of_date

        if notifications.size > 0
          notices = generate_notifications(notifications, team)
          if notices.present?
            item = {
              team_name: team.name,
              notifications: notices
            }

            results << item
          end
        end
      end

      results
    end

    def generate_notifications notifications, team
      results = []

      notifications.each do |notification|
        unread_users = team.users - notification.users

        if unread_users.size > 0
          item = {
            title: notification.title,
            unread_users: unread_users
          }

          results << item
        end
      end

      results
    end
  end
end
