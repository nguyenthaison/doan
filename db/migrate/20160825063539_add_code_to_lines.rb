class AddCodeToLines < ActiveRecord::Migration
  def change
    add_column :lines, :code, :string, after: :id
  end
end
