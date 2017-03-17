class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :name
      t.string :notes
      t.references :department, index: true, foreign: true
      t.timestamps null: false
      t.integer :creator_id
      t.integer :updater_id
    end
  end
end
