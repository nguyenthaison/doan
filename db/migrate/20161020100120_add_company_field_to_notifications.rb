class AddCompanyFieldToNotifications < ActiveRecord::Migration
  def change
  	add_reference :notifications, :company_field, index: true, foreign_key: true
  end
end
