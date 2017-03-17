class CreateTroubles < ActiveRecord::Migration
  def change
    create_table :troubles do |t|
      t.string :name
      t.integer :parent_id
      t.timestamps null: false
      t.integer :creator_id
      t.integer :updater_id
    end
  end
end
