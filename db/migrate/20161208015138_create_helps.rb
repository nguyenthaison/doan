class CreateHelps < ActiveRecord::Migration[5.0]
  def change
    create_table :helps do |t|
      t.boolean :is_checked, default: false
      t.references :navigation, index: true, foreign: true
      t.references :user, index: true, foreign: true
      t.datetime :deleted_at
      t.integer :creator_id
      t.integer :updater_id
      t.timestamps
    end
  end
end
