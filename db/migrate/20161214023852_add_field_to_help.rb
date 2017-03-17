class AddFieldToHelp < ActiveRecord::Migration[5.0]
  def change
    add_column :helps, :field_id, :integer
  end
end
