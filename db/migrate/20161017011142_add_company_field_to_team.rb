class AddCompanyFieldToTeam < ActiveRecord::Migration
  def change
    add_reference :teams, :company_field, index: true, foreign_key: true
    remove_reference :teams, :field, index: true, foreign_key: true
  end
end
