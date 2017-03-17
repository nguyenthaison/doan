class AddReferenceToAnnoucement < ActiveRecord::Migration
  def change
    add_reference :settings, :company_field, index: true, foreign_key: true
  end
end
