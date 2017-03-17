class RemoveCodeAndAddOrderFromTags < ActiveRecord::Migration
  def change
    remove_column :tags, :code

    add_column :tags, :order, :integer

    change_column :users, :email, :string, null: true
    remove_index :users, :email
  end
end
