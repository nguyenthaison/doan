class AddTroublesAndRenameClientIdInFaquestions < ActiveRecord::Migration
  def change
    rename_column :faquestions, :client_id, :user_id
    change_column :faquestions, :user_id, :integer, after: :id

    remove_column :faquestions, :trouble_id

    add_column :faquestions, :big_trouble_id, :integer
    add_column :faquestions, :medium_trouble_id, :integer
    add_column :faquestions, :small_trouble_id, :integer
    add_column :faquestions, :tiny_trouble_id, :integer
  end
end
