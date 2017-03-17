class Organization < ActiveRecord::Base
  include SmartAsJson
  include Search
  include Userstamp

  ATTRIBUTES_PARAMS = %i[name notes company_id]
  acts_as_paranoid

  belongs_to :company

  has_many :departments, dependent: :destroy

  validates :name, presence: true, length: {maximum: 80}
  validates :notes, length: {maximum: 600}

  after_save :clear_redis
  after_destroy :clear_redis

  def clear_redis
    $redis.del "organizations"
  end

  class << self
    def search_by_query query
      fields = {id: "eq", name: "like"}
      search_follow_field query, fields
    end
  end
end
