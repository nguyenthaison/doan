class CreateManualFiles < ActiveRecord::Migration[5.0]
  def change
    create_table :manual_files do |t|
      t.references :folder, foreign_key: true
      t.integer :creator_id
      t.integer :updater_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
