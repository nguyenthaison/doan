class CreateClientNotificationLines < ActiveRecord::Migration
  def change
    create_table :client_notification_lines do |t|
      t.references :notification, index: true, foreign: true
      t.references :client, index: true, foreign: true
      t.references :line, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
