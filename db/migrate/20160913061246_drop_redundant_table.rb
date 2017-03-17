class DropRedundantTable < ActiveRecord::Migration
  def change
    drop_table :notification_categories
    drop_table :department_faquestions
    drop_table :community_departments
  end
end
