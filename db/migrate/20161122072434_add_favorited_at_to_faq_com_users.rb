class AddFavoritedAtToFaqComUsers < ActiveRecord::Migration
  def change
    add_column :faquestion_users, :favorited_at, :datetime
    add_column :community_users, :favorited_at, :datetime
  end
end
