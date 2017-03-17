class CreateNotificationNotes < ActiveRecord::Migration
  def change
    create_table :notification_notes do |t|
      t.references :notification, index: true, foreign: true
      t.text :content
      t.timestamps null: false
    end
  end
end
