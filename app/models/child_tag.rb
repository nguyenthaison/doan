class ChildTag < ActiveRecord::Base
  belongs_to :tag

  has_many :faquestion_tags, dependent: :destroy

  validates :name, presence: true, length: {maximum: 80}
  validates :notes, length: {maximum: 600}
end
