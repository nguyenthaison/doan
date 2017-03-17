class CreateFaquestionUsers < ActiveRecord::Migration
  def change
    create_table :faquestion_users do |t|
      t.references :faquestion, index: true, foreign: true
      t.references :user, index: true, foreign: true
      t.boolean :favorite, default: false
      t.timestamps null: false
    end
  end
end
