class BookmarkFolder < ApplicationRecord
  include SmartAsJson
  include Userstamp

  acts_as_paranoid
  ATTRIBUTES_PARAMS = %i[name parent_id]
  ALLOWED_METHODS = %i[recursive_parent]

  belongs_to :parent, class_name: BookmarkFolder.name, foreign_key: "parent_id"

  has_many :bookmarks, dependent: :destroy
  has_many :bookmark_folders, class_name: BookmarkFolder.name, foreign_key: "parent_id",
    dependent: :destroy

  validates :name, presence: true, length: {maximum: 255}
  validates :name, uniqueness: {scope: :parent_id}, unless: ->{parent_id == nil}

  def recursive_parent
    temp_parent_id = self.parent_id
    recursive_folder = []
    while temp_parent_id != nil
      folder = BookmarkFolder.find_by id: temp_parent_id
      if folder
        recursive_folder.unshift folder.as_json({only: [:id, :name]})
        temp_parent_id = folder.parent_id
      else
        temp_parent_id = nil
      end
    end
    recursive_folder
  end
end
