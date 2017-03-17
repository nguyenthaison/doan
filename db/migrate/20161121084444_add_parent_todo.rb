class AddParentTodo < ActiveRecord::Migration
  def change
    add_column :todos, :parent_todo_id, :integer
  end
end
