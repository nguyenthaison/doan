class CreateTroubleNames < ActiveRecord::Migration
  def change
    create_table :trouble_names do |t|
      t.string :key
      t.string :name
      t.integer :creator_id
      t.integer :updater_id
      t.datetime :deleted_at
      t.timestamps null: false
    end
  end
end
