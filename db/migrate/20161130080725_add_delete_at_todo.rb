class AddDeleteAtTodo < ActiveRecord::Migration[5.0]
  def change
    add_column :todos, :deleted_at, :datetime
  end
end
