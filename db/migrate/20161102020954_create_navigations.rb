class CreateNavigations < ActiveRecord::Migration
  def change
    create_table :navigations do |t|
      t.references :client, index: true, foreign: true
      t.references :line, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
