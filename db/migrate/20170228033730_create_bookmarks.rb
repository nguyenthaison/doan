class CreateBookmarks < ActiveRecord::Migration[5.0]
  def change
    create_table :bookmarks do |t|
      t.string :name
      t.references :bookmark_folder, foreign_key: true
      t.string :description
      t.integer :creator_id
      t.integer :updater_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
