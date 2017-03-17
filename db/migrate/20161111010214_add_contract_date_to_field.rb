class AddContractDateToField < ActiveRecord::Migration
  def change
    add_column :fields, :contract_start_date, :datetime, after: :name
    add_column :fields, :contract_end_date, :datetime, after: :contract_start_date

    add_reference :fields, :company, index: true, foreign_key: true, after: :contract_end_date

    add_reference :teams, :field, index: true, foreign_key: true, after: :notes
  end
end
