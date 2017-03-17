class ClientNotificationLine < ActiveRecord::Base
  belongs_to :client
  belongs_to :line
  belongs_to :notification
end
