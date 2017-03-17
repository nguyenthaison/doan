class AddDeletedAtTotable < ActiveRecord::Migration
  def change
    add_column :departments, :deleted_at, :datetime
    add_index :departments, :deleted_at

    add_column :lines, :deleted_at, :datetime
    add_index :lines, :deleted_at

    add_column :organizations, :deleted_at, :datetime
    add_index :organizations, :deleted_at

    add_column :positions, :deleted_at, :datetime
    add_index :positions, :deleted_at

    add_column :tags, :deleted_at, :datetime
    add_index :tags, :deleted_at

    add_column :teams, :deleted_at, :datetime
    add_index :teams, :deleted_at

    add_column :troubles, :deleted_at, :datetime
    add_index :troubles, :deleted_at

    add_column :users, :deleted_at, :datetime
    add_index :users, :deleted_at

    add_column :comments, :deleted_at, :datetime
    add_index :comments, :deleted_at
  end
end
