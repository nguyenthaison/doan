class RemoveCodeFromTable < ActiveRecord::Migration
  def change
    remove_column :lines, :code

    remove_column :organizations, :code

    remove_column :departments, :code

    remove_column :teams, :code

    remove_column :positions, :code

    add_column :troubles, :trouble_content_id, :string, after: :name
  end
end
