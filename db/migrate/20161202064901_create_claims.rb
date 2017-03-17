class CreateClaims < ActiveRecord::Migration[5.0]
  def change
    create_table :claims do |t|
      t.string :title
      t.references :field, index: true, foreign: true
      t.text :content
      t.integer :creator_id
      t.integer :updater_id
      t.datetime :deleted_at
      t.timestamps
    end
  end
end
