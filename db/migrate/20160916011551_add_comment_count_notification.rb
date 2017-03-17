class AddCommentCountNotification < ActiveRecord::Migration
  def change
    add_column :notifications, :comment_count, :integer, default: 0, after: :end_date
  end
end
