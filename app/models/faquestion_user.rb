class FaquestionUser < ActiveRecord::Base
  belongs_to :faquestion
  belongs_to :user
end
