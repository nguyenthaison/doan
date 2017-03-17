class AddDeleteAtToCompanyField < ActiveRecord::Migration
  def change
    add_column :company_fields, :is_active, :boolean, default: false
  end
end
