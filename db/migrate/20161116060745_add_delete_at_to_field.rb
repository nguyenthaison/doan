class AddDeleteAtToField < ActiveRecord::Migration
  def change
    add_column :fields, :deleted_at, :datetime
  end
end
