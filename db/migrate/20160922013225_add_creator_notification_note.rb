class AddCreatorNotificationNote < ActiveRecord::Migration
  def change
    add_column :notification_notes, :creator_id, :integer
    add_column :notification_notes, :updater_id, :integer
  end
end
