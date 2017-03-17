class ChangeTypeOfContractDate < ActiveRecord::Migration[5.0]
  def change
    change_column :fields, :contract_start_date, :date
    change_column :fields, :contract_end_date, :date
  end
end
