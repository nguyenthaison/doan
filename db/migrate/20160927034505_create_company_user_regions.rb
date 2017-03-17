class CreateCompanyUserRegions < ActiveRecord::Migration
  def change
    create_table :company_user_regions do |t|
      t.references :company, index: true, foreign_key: true
      t.references :user_region, index: true, foreign_key: true
      t.datetime :contract_start_date
      t.datetime :contract_end_date
      t.integer :creator_id
      t.integer :updater_id
      t.timestamps null: false
    end
  end
end
