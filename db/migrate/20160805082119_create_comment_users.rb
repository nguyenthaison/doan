class CreateCommentUsers < ActiveRecord::Migration
  def change
    create_table :comment_users do |t|
      t.references :user, index: true, foreign: true
      t.references :comment, index: true, foreign: true
      t.boolean :vote, default: false
      t.timestamps null: false
    end
  end
end
