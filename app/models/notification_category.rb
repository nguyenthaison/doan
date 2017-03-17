class NotificationCategory < ActiveRecord::Base
  has_many :notifications
end
