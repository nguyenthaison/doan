class ChangeNoteTypeInUsers < ActiveRecord::Migration
  def change
    change_column :users, :notes, :text
  end
end
