class AddNavigationIdInTodos < ActiveRecord::Migration
  def change
    add_reference :todos, :navigation, index: true, foreign_key: true
  end
end
