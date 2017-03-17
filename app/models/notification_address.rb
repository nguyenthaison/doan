class NotificationAddress < ActiveRecord::Base
  include SmartAsJson
  include Search
  include Userstamp

  enum notification_type: [:help, :notification]

  ATTRIBUTE_PARAMS = [:company_id, :field_id, :user_id, :notification_type,
    notification_address_teams_attributes: [:id, :organization_id, :department_id, :team_id]]

  belongs_to :user
  belongs_to :field

  has_many :notification_address_teams, dependent: :destroy
  has_many :teams, through: :notification_address_teams

  validates :notification_type, :user, presence: true
  validates :notification_address_teams, presence: true

  scope :notifications, -> do
    where "notification_type = ?", NotificationAddress.notification_types[:notification]
  end

  accepts_nested_attributes_for :notification_address_teams

  class << self
    def search_by_query query
      fields = {}
      search_follow_field query, fields
    end
  end
end
