class Bookmark < ApplicationRecord
  include Userstamp

  ATTRIBUTES_PARAMS = %i[name description bookmark_folder_id url]

  acts_as_paranoid

  belongs_to :bookmark_folder

  validates :name, presence: true, length: {maximum: 255}
  validates :url, presence: true, length: {maximum: 255}
  validates :url, uniqueness: {scope: :bookmark_folder_id}
end
