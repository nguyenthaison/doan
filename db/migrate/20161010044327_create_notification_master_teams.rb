class CreateNotificationMasterTeams < ActiveRecord::Migration
  def change
    create_table :notification_master_teams do |t|
      t.references :notification_master, index: true, foreign: true
      t.references :organization, index: true, foreign_key: true
      t.references :department, index: true, foreign_key: true
      t.references :team, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
