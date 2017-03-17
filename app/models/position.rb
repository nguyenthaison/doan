class Position < ActiveRecord::Base
  include SmartAsJson
  include Search
  include Userstamp

  ATTRIBUTES_PARAMS = %i[name notes company_id]
  auto_strip_attributes *ATTRIBUTES_PARAMS, nullify: false
  acts_as_paranoid

  has_many :users

  belongs_to :company

  validates :name, presence: true, length: {maximum: 80}
  validates :notes, length: {maximum: 600}

  class << self
    def search_by_query query
      fields = {id: "eq", name: "like"}
      search_follow_field query, fields
    end
  end
end
