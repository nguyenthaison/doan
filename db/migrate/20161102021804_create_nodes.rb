class CreateNodes < ActiveRecord::Migration
  def change
    create_table :nodes do |t|
      t.string :name
      t.references :todo, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
