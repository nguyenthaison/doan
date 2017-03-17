class AddCompanyFieldToMaster < ActiveRecord::Migration
  def change
    remove_reference :clients, :field, index: true, foreign_key: true
    remove_reference :tags, :field, index: true, foreign_key: true
    remove_reference :trouble_names, :field, index: true, foreign_key: true
    remove_reference :troubles, :field, index: true, foreign_key: true

    remove_reference :clients, :company, index: true, foreign_key: true
    remove_reference :tags, :company, index: true, foreign_key: true
    remove_reference :trouble_names, :company, index: true, foreign_key: true
    remove_reference :troubles, :company, index: true, foreign_key: true

    add_reference :clients, :company_field, index: true, foreign_key: true
    add_reference :tags, :company_field, index: true, foreign_key: true
    add_reference :trouble_names, :company_field, index: true, foreign_key: true
    add_reference :troubles, :company_field, index: true, foreign_key: true
  end
end
