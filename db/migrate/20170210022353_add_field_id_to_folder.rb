class AddFieldIdToFolder < ActiveRecord::Migration[5.0]
  def change
    add_column :folders, :field_id, :integer
  end
end
