class CreateRssSources < ActiveRecord::Migration
  def change
    create_table :rss_sources do |t|
      t.string :url
      t.string :title
      t.references :field, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
