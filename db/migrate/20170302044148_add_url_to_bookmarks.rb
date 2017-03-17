class AddUrlToBookmarks < ActiveRecord::Migration[5.0]
  def change
    add_column :bookmarks, :url, :string
  end
end
