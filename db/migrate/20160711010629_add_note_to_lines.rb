class AddNoteToLines < ActiveRecord::Migration
  def change
    add_column :lines, :notes, :string
  end
end
