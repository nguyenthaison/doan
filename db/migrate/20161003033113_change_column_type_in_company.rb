class ChangeColumnTypeInCompany < ActiveRecord::Migration
  def change
    change_column :companies, :notes, :text
  end
end
