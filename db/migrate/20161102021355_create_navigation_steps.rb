class CreateNavigationSteps < ActiveRecord::Migration
  def change
    create_table :navigation_steps do |t|
      t.references :navigation, index: true, foreign: true
      t.references :step, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
