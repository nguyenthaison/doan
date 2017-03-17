class CreateSettings < ActiveRecord::Migration
  def change
    create_table :settings do |t|
      t.string :key
      t.text :content
      t.integer :creator_id
      t.integer :updater_id
      t.datetime :deleted_at
      t.timestamps null: false
    end
  end
end
