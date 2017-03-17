class NotificationAddressTeam < ActiveRecord::Base
  belongs_to :organization
  belongs_to :department
  belongs_to :team
  belongs_to :notification_address
end
