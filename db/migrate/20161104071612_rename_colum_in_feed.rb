class RenameColumInFeed < ActiveRecord::Migration
  def change
    rename_column :feeds, :source, :rss_source_id
  end
end
