class DropFaqCommunityPosition < ActiveRecord::Migration
  def change
    drop_table :community_positions
    drop_table :faquestion_positions
  end
end
