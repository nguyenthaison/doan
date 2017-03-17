class ChangePublicDateToDatetime < ActiveRecord::Migration[5.0]
  def change
    change_column :navigations, :publish_date, :datetime
  end
end
