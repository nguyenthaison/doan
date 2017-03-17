class CreateNavigationFlows < ActiveRecord::Migration
  def change
    create_table :flows do |t|
      t.string :name
      t.references :step, index: true, foreign_key: true
      t.integer :big_trouble_id
      t.integer :medium_trouble_id
      t.integer :small_trouble_id
      t.integer :tiny_trouble_id
    end
  end
end
