class CreateChildTags < ActiveRecord::Migration
  def change
    create_table :child_tags do |t|
      t.string :name
      t.string :notes
      t.references :tag, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
