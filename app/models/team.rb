class Team < ActiveRecord::Base
  include SmartAsJson
  include Search
  include Userstamp

  ATTRIBUTES_PARAMS = %i[name notes department_id company_id field_id]
  acts_as_paranoid

  belongs_to :department
  belongs_to :field
  belongs_to :company

  has_many :users
  has_many :notification_teams
  has_many :notifications, through: :notification_teams

  validates :name, presence: true, length: {maximum: 80}
  validates :notes, length: {maximum: 600}
  validates :department_id, presence: true

  after_save :clear_redis
  after_destroy :clear_redis

  def clear_redis
    $redis.del "teams"
  end

  class << self
    def clear_field_id teams
      teams.update_all field_id: nil
      $redis.del "teams"
    end

    def update_field_id team_ids, field
      Team.clear_field_id field.teams
      Team.where("id IN (?)", team_ids).update_all field_id: field.id
      $redis.del "teams"
    end

    def search_by_query query
      fields = {id: "eq", name: "like"}
      search_follow_field query, fields
    end
  end
end
