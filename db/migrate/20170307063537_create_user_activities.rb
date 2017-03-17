class CreateUserActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :user_activities do |t|
      t.references :community, foreign_key: true, index: true
      t.references :comment, foreign_key: true, index: true
      t.references :user, index: true, foreign: true
      t.string :activity_type
      t.integer :creator_id
      t.integer :updater_id
      t.timestamps
    end
  end
end
