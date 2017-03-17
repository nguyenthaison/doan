class ChangeDateNotifications < ActiveRecord::Migration
  def change
    remove_column :notifications, :notice_start
    remove_column :notifications, :end_start
    add_column  :notifications, :start_date, :date, after: :read
    add_column  :notifications, :end_date, :date, after: :start_date
  end
end
