class CreateCommunityDepartments < ActiveRecord::Migration
  def change
    create_table :community_departments do |t|
      t.references :department, index: true, foreign: true
      t.references :community, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
