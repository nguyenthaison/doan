class CreateFaquestionTeams < ActiveRecord::Migration
  def change
    create_table :faquestion_teams do |t|
      t.references :faquestion, index: true, foreign: true
      t.references :team, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
