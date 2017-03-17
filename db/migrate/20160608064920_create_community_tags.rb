class CreateCommunityTags < ActiveRecord::Migration
  def change
    create_table :community_tags do |t|
      t.references :community, index: true, foreign: true
      t.references :tag, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
