class CreateNotificationTeams < ActiveRecord::Migration
  def change
    create_table :notification_teams do |t|
      t.references :notification, index: true, foreign: true
      t.references :team, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
