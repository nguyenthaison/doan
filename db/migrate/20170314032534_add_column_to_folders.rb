class AddColumnToFolders < ActiveRecord::Migration[5.0]
  def change
    add_column :folders, :lft, :integer
    add_column :folders, :rgt, :integer
  end
end
