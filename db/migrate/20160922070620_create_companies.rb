class CreateCompanies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :name
      t.string :name_kana
      t.string :postal_code
      t.string :address
      t.string :phone_number
      t.string :fax
      t.references :user, index: true, foreign: true
      t.string :billing_address_zip
      t.string :billing_address
      t.string :phone_number_billing
      t.string :fax_billing
      t.string :name_PIC_billing
      t.string :name_kana_PIC_billing
      t.datetime :contract_start_date
      t.datetime :contract_end_date
      t.string :notes
      t.integer :creator_id
      t.integer :updater_id
      t.timestamps null: false
    end
  end
end
