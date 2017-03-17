class CreateNotificationCategories < ActiveRecord::Migration
  def change
    create_table :notification_categories do |t|
      t.string :name
      t.timestamps null: false
    end
  end
end
