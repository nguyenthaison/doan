class ChangeComments < ActiveRecord::Migration
  def change
    change_column :comments, :content, :text
    add_column :communities, :comment_count, :integer, default: 0, after: :tiny_trouble_id
  end
end
