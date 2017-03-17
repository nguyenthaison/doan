class RemoveAttachfileAndAddViewFaqUser < ActiveRecord::Migration
  def change
    remove_column :faquestions, :attached_file
    change_column :faquestions, :views, :integer, default: 0
    add_column :faquestion_users, :view, :boolean, after: :helpful, default: false
  end
end
