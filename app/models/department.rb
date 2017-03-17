class Department < ActiveRecord::Base
  include SmartAsJson
  include Search
  include Userstamp

  ATTRIBUTES_PARAMS = %i[name notes organization_id company_id]
  acts_as_paranoid

  belongs_to :company
  belongs_to :organization

  has_many :teams, dependent: :destroy

  validates :name, presence: true, length: {maximum: 80}
  validates :notes, length: {maximum: 600}
  validates :organization_id, presence: true

  after_save :clear_redis
  after_destroy :clear_redis

  def clear_redis
    $redis.del "departments"
  end

  class << self
    def search_by_query query
      fields = {id: "eq", name: "like"}
      search_follow_field query, fields
    end
  end
end
