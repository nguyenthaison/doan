class AddDefaultVotesComment < ActiveRecord::Migration
  def change
    change_column :comments, :votes, :integer, default: 0
  end
end
