class CreateFaquestionPositions < ActiveRecord::Migration
  def change
    create_table :faquestion_positions do |t|
      t.references :faquestion, index: true, foreign: true
      t.references :position, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
