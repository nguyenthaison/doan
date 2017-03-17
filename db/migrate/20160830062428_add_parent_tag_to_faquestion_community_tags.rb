class AddParentTagToFaquestionCommunityTags < ActiveRecord::Migration
  def change
    add_column :faquestion_tags, :parent_tag_id, :integer
    add_column :community_tags, :parent_tag_id, :integer
  end
end
