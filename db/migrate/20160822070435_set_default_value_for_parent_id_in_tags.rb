class SetDefaultValueForParentIdInTags < ActiveRecord::Migration
  def change
    change_column :tags, :parent_id, :integer, default: 0
  end
end
