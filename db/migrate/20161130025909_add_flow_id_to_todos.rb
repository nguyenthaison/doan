class AddFlowIdToTodos < ActiveRecord::Migration[5.0]
  def change
    add_column :todos, :flow_id, :integer
  end
end
