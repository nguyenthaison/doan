class CreateNotificationUsers < ActiveRecord::Migration
  def change
    create_table :notification_users do |t|
      t.references :notification, index: true, foreign: true
      t.references :user, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
