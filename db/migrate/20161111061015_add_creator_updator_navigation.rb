class AddCreatorUpdatorNavigation < ActiveRecord::Migration
  def change
    add_column :navigations, :creator_id, :integer
    add_column :navigations, :updater_id, :integer
  end
end
