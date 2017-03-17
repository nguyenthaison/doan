class AddCompanyFieldToFaqs < ActiveRecord::Migration
  def change
  	add_reference :faquestions, :company_field, index: true, foreign_key: true
  	add_reference :communities, :company_field, index: true, foreign_key: true
  end
end
