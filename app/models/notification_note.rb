class NotificationNote < ActiveRecord::Base
  include SmartAsJson

  ATTRIBUTES_PARAMS = %i[content notification_id]
  auto_strip_attributes :content, nullify: false

  belongs_to :notification
  belongs_to :creator, -> {with_deleted}, class_name: "User", foreign_key: "creator_id"
  belongs_to :updater, -> {with_deleted}, class_name: "User", foreign_key: "updater_id"

  validates :content, presence: true, length: {maximum: 2000}
end
