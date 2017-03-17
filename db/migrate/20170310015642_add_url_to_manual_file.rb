class AddUrlToManualFile < ActiveRecord::Migration[5.0]
  def change
    add_column :manual_files, :link_file, :text
  end
end
