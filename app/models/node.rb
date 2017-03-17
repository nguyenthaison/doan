class Node < ActiveRecord::Base
  has_one :todo

  validates :name, presence: true, length: {maximum: 10}

  acts_as_paranoid
end
