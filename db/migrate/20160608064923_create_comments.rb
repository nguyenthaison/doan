class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :content
      t.integer :votes
      t.references :community, index: true, foreign: true
      t.timestamps null: false
      t.integer :creator_id
      t.integer :updater_id
    end
  end
end
