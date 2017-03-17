class AddCreatorUpdaterToUsers < ActiveRecord::Migration
  def change
    add_column :users, :creator_id, :integer
    add_column :users, :updater_id, :integer
    add_column :users, :organization_id, :integer
  end
end
