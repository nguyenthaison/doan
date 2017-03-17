class CreateDepartmentFaquestions < ActiveRecord::Migration
  def change
    create_table :department_faquestions do |t|
      t.references :faquestion, index: true, foreign: true
      t.references :department, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
