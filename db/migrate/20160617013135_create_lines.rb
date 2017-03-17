class CreateLines < ActiveRecord::Migration
  def change
    create_table :lines do |t|
      t.string :name
      t.string :name_kana
      t.string :free_dial_number
      t.references :user, index: true, foreign: true
      t.references :trouble, index: true, foreign: true
      t.references :client, index: true, foreign: true
      t.timestamps null: false
      t.integer :creator_id
      t.integer :updater_id
    end
  end
end
