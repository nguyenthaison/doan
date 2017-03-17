class AddDeletedAtInNavigation < ActiveRecord::Migration[5.0]
  def change
    add_column :navigation_steps, :deleted_at, :datetime
    add_column :nodes, :deleted_at, :datetime
    add_column :navigations, :deleted_at, :datetime
  end
end
