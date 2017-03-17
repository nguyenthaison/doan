class AddFieldIdToSomeTables < ActiveRecord::Migration[5.0]
  def change
    add_column :navigations, :field_id, :integer
    add_column :flows, :field_id, :integer

    add_column :flows, :creator_id, :integer
    add_column :flows, :updater_id, :integer
  end
end
