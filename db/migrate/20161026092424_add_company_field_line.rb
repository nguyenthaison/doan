class AddCompanyFieldLine < ActiveRecord::Migration
  def change
    add_reference :lines, :company_field, index: true, foreign_key: true
  end
end
