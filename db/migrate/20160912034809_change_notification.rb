class ChangeNotification < ActiveRecord::Migration
  def change
    add_column :notifications, :title, :string, after: :end_start
    add_column :notifications, :priority, :integer, after: :content
    change_column :notifications, :content, :text
    remove_column :notifications, :attached_file
    remove_column :notifications, :user_id
    remove_column :notifications, :client_id
    remove_column :notifications, :indefinite
    remove_column :notifications, :notification_category_id
    remove_column :notifications, :tag_id
  end
end
