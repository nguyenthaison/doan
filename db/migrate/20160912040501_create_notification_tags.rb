class CreateNotificationTags < ActiveRecord::Migration
  def change
    create_table :notification_tags do |t|
      t.references :notification, index: true, foreign: true
      t.references :tag, index: true, foreign: true
      t.integer :parent_tag_id
      t.timestamps null: false
    end
  end
end
