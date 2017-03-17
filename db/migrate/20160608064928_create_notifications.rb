class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.datetime :notice_start
      t.datetime :end_start
      t.boolean :indefinite, default: false
      t.string :content
      t.string :attached_file
      t.references :client, index: true, foreign: true
      t.references :notification_category, index: true, foreign: true
      t.references :tag, index: true, foreign: true
      t.integer :user_id
      t.boolean :read, default: false
      t.timestamps null: false
      t.integer :creator_id
      t.integer :updater_id
    end
  end
end
