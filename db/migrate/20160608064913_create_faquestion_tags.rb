class CreateFaquestionTags < ActiveRecord::Migration
  def change
    create_table :faquestion_tags do |t|
      t.references :faquestion, index: true, foreign: true
      t.references :tag, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
