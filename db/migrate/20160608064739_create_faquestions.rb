class CreateFaquestions < ActiveRecord::Migration
  def change
    create_table :faquestions do |t|
      t.string :title
      t.string :question
      t.string :answer
      t.string :attached_file
      t.integer :views
      t.integer :helpfuls
      t.integer :priority
      t.references :client, index: true, foreign: true
      t.references :trouble, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
