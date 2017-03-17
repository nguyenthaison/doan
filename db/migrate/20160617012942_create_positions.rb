class CreatePositions < ActiveRecord::Migration
  def change
    create_table :positions do |t|
      t.string :name
      t.string :notes
      t.timestamps null: false
      t.integer :creator_id
      t.integer :updater_id
    end
  end
end
