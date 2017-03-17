class AddPublishDateToNavigations < ActiveRecord::Migration[5.0]
  def change
    add_column :navigations, :publish_date, :date
  end
end
