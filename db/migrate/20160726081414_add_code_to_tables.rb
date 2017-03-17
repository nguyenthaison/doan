class AddCodeToTables < ActiveRecord::Migration
  def change
    add_column :clients, :code, :string, after: :name

    add_column :lines, :code, :string, after: :name

    add_column :organizations, :code, :string, after: :name

    add_column :departments, :code, :string, after: :name

    add_column :teams, :code, :string, after: :name

    add_column :positions, :code, :string, after: :name

    add_column :tags, :code, :string, after: :name
  end
end
