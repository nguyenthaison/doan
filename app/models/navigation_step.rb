class NavigationStep < ActiveRecord::Base
  belongs_to :navigation
  belongs_to :step

  has_many :todos, dependent: :destroy

  acts_as_paranoid
end
