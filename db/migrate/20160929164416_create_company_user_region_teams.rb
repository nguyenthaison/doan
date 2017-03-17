class CreateCompanyUserRegionTeams < ActiveRecord::Migration
  def change
    create_table :company_user_region_teams do |t|
      t.references :user_region, index: true, foreign_key: true
      t.references :company_user_region, index: true, foreign_key: true
      t.references :organization, index: true, foreign_key: true
      t.references :department, index: true, foreign_key: true
      t.references :team, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
