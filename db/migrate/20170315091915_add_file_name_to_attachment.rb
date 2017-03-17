class AddFileNameToAttachment < ActiveRecord::Migration[5.0]
  def change
    add_column :manual_files, :file_name, :string
  end
end
