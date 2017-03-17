class ChangeNotesTypeInSomeTables < ActiveRecord::Migration
  def change
    change_column :departments, :notes, :text
    change_column :organizations, :notes, :text
    change_column :positions, :notes, :text
    change_column :tags, :notes, :text
    change_column :teams, :notes, :text
  end
end
