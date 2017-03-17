class AddAttributeToField < ActiveRecord::Migration[5.0]
  def change
    add_column :fields, :style, :integer
  end
end
