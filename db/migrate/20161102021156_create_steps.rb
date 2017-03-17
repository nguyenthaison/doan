class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.references :company_field, index: true, foreign: true
      t.string :name
      t.boolean :active, default: true
      t.timestamps null: false
    end
  end
end
