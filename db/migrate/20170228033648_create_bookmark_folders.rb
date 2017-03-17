class CreateBookmarkFolders < ActiveRecord::Migration[5.0]
  def change
    create_table :bookmark_folders do |t|
      t.string :name
      t.integer :parent_id
      t.integer :creator_id
      t.integer :updater_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
