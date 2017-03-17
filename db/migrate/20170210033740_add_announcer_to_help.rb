class AddAnnouncerToHelp < ActiveRecord::Migration[5.0]
  def change
    add_column :helps, :announcer, :integer
  end
end
