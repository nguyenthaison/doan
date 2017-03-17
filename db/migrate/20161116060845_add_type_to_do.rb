class AddTypeToDo < ActiveRecord::Migration
  def change
    add_column :todos, :category, :integer, after: :node_id
  end
end
