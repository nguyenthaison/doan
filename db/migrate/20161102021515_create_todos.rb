class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :title
      t.text :content
      t.references :navigation_step, index: true, foreign: true
      t.integer :node_id
      t.timestamps null: false
    end
  end
end
