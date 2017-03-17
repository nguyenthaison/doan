class CreateCommunityUsers < ActiveRecord::Migration
  def change
    create_table :community_users do |t|
      t.references :community, index: true, foreign: true
      t.references :user, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
