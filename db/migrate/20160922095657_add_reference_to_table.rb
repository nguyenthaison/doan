class AddReferenceToTable < ActiveRecord::Migration
  def change
    add_reference :users, :company, index: true
    add_reference :organizations, :company, index: true
    add_reference :departments, :company, index: true
    add_reference :teams, :company, index: true
  end
end
