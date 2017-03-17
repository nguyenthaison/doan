class AddDeletedAtToFaquestions < ActiveRecord::Migration
  def change
    add_column :faquestions, :deleted_at, :datetime
  end
end
