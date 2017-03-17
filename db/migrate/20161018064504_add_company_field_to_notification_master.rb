class AddCompanyFieldToNotificationMaster < ActiveRecord::Migration
  def change
    remove_column :notification_master_teams, :notification_master_id

    rename_table :notification_masters, :notification_addresses
    rename_table :notification_master_teams, :notification_address_teams

    add_reference :notification_address_teams, :notification_address, index: true, foreign_key: true
    add_reference :notification_addresses, :company_field, index: true, foreign_key: true

  end
end
