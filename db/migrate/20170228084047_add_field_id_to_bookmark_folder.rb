class AddFieldIdToBookmarkFolder < ActiveRecord::Migration[5.0]
  def change
    add_column :bookmark_folders, :field_id, :integer
  end
end
