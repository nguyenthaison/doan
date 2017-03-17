class Folder < ApplicationRecord
  include SmartAsJson, Userstamp, Search

  acts_as_nested_set
  acts_as_paranoid
  FOLDER_ATTRIBUTES_PARAMS = %i[name parent_id]
  ALLOWED_METHODS = %i[recursive_parent path_name]

  belongs_to :parent, class_name: Folder.name, foreign_key: "parent_id"

  has_many :manual_files, dependent: :destroy
  has_many :folders, class_name: Folder.name, foreign_key: "parent_id", dependent: :destroy

  validates :name, presence: true, length: {maximum: 255}
  validates :name, uniqueness: {scope: :parent_id}, unless: ->{parent_id == nil}

  def recursive_parent
    self.ancestors.as_json({only: [:id, :name]})
  end

  def path_name
    self.ancestors.pluck(:name).join "/"
  end

  class << self
    def search_by_query conditions
      like_query = "%#{sanitize_sql_like conditions[:query].strip}%"
      parent_folder = Folder.find conditions[:parent_id]
      parent_folder.descendants.where "name LIKE ?", like_query
    end
  end
end
