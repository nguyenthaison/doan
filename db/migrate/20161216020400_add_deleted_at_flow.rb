class AddDeletedAtFlow < ActiveRecord::Migration[5.0]
  def change
    add_column :flows, :deleted_at, :datetime
  end
end
