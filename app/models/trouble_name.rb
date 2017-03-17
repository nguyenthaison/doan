class TroubleName < ActiveRecord::Base
  include SmartAsJson
  include Search
  include Userstamp

  ATTRIBUTE_PARAMS = [:name]

  belongs_to :field

  class << self
    def search_by_query query
      fields = {}
      search_follow_field query, fields
    end
  end
end
