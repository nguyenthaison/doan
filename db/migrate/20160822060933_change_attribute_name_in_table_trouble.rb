class ChangeAttributeNameInTableTrouble < ActiveRecord::Migration
  def change
    remove_column :troubles, :trouble_content_id
    remove_column :users, :username
    add_column :troubles, :code, :string, after: :id
    change_column :clients, :address, :text
  end
end
