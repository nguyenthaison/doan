class CreateCommunityTeams < ActiveRecord::Migration
  def change
    create_table :community_teams do |t|
      t.references :team, index: true, foreign: true
      t.references :community, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
