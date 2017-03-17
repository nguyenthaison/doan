class CreateLineTroubles < ActiveRecord::Migration
  def change
    create_table :line_troubles do |t|
      t.references :line, index: true, foreign: true
      t.integer :big_trouble_id
      t.integer :medium_trouble_id
      t.integer :small_trouble_id
      t.integer :tiny_trouble_id
      t.timestamps null: false
    end
  end
end
