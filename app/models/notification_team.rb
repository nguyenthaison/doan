class NotificationTeam < ActiveRecord::Base
  belongs_to :team
  belongs_to :notification
end
