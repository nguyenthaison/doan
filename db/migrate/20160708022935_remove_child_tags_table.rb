class RemoveChildTagsTable < ActiveRecord::Migration
  def change
    drop_table :child_tags
    add_column :tags, :parent_id, :integer
  end
end
