class AddUserRegionToUserAndTeam < ActiveRecord::Migration
  def change
    add_reference :teams, :user_region, index: true, foreign_key: true
    add_reference :users, :user_region, index: true, foreign_key: true
    remove_column :companies, :contract_start_date, :string
    remove_column :companies, :contract_end_date, :string
  end
end
