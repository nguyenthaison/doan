class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.string :name
      t.string :name_kana
      t.string :short_name
      t.string :address
      t.string :phone_number
      t.string :note
      t.timestamps null: false
      t.integer :creator_id
      t.integer :updater_id
    end
  end
end
