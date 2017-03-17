class Help < ApplicationRecord
  include SmartAsJson
  include Userstamp

  ATTRIBUTES_PARAMS = [:is_checked, :navigation_id, :user_id, :field_id, :announcer]

  belongs_to :navigation
  belongs_to :user
  belongs_to :field
  acts_as_paranoid

  scope :help_active, -> field_id {where(is_checked: false, field_id: field_id)}

  after_create_commit do
    EventBroadcastJob.perform_later self, get_current_user
  end

  after_update_commit do
    EventBroadcastJob.perform_later self, get_current_user
  end

  def json_data options = {}
    options = options.deep_merge({
      include: {
        navigation: {
          include: {
            client: {only: ["name"]},
            line: {only: ["name"]},
          },
          only: ["id"],
        },
        user: {
          only: ["name"],
          include: {team: {only: ["id"]}},
        },
      },
    })
    as_json options
  end

  def get_current_user
    current_user = nil
    if !$redis.get("#{self.announcer}").nil?
      current_user_id = $redis.get("#{self.announcer}").to_i
      current_user = User.find current_user_id
    end
    current_user
  end
end
