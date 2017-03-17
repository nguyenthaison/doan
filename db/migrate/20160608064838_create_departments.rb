class CreateDepartments < ActiveRecord::Migration
  def change
    create_table :departments do |t|
      t.string :name
      t.string :notes
      t.references :organization, index: true, foreign: true
      t.timestamps null: false
      t.integer :creator_id
      t.integer :updater_id
    end
  end
end
