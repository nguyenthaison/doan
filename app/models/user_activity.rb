class UserActivity < ApplicationRecord
  include Userstamp
  include SmartAsJson

  belongs_to :community
  belongs_to :comment
end
