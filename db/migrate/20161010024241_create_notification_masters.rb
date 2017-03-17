class CreateNotificationMasters < ActiveRecord::Migration
  def change
    create_table :notification_masters do |t|
      t.references :company, index: true, foreign: true
      t.references :user_region, index: true, foreign: true
      t.references :user, index: true, foreign: true
      t.integer :notification_type, default: 0
      t.integer :creator_id
      t.integer :updater_id
      t.timestamps null: false
    end
  end
end
