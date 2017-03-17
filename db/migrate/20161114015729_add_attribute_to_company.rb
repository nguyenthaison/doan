class AddAttributeToCompany < ActiveRecord::Migration
  def change
    add_column :companies, :name_PIC, :string, after: :fax
    add_column :companies, :name_kana_PIC, :string, after: :name_PIC
  end
end
