class ChangeDataTypeFieldNotesToUse < ActiveRecord::Migration
  def change
    change_column :lines, :notes, :text
  end
end
