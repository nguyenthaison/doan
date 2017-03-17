class ChangeOrderNumberInTags < ActiveRecord::Migration[5.0]
  def change
    rename_column :tags, :order, :order_number
  end
end
