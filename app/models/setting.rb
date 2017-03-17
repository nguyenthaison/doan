class Setting < ActiveRecord::Base
  include SmartAsJson

  ATTRIBUTE_PARAMS = %i[key content]

  belongs_to :field
end
