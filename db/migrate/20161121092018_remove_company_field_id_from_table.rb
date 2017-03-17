class RemoveCompanyFieldIdFromTable < ActiveRecord::Migration
  def change
    remove_reference :clients, :company_field, index: true, foreign_key: true
    remove_reference :communities, :company_field, index: true, foreign_key: true
    remove_reference :company_fields_teams, :company_field, index: true, foreign_key: true
    remove_reference :faquestions, :company_field, index: true, foreign_key: true
    remove_reference :lines, :company_field, index: true, foreign_key: true
    remove_reference :notification_addresses, :company_field, index: true, foreign_key: true
    remove_reference :notifications, :company_field, index: true, foreign_key: true
    remove_reference :settings, :company_field, index: true, foreign_key: true
    remove_reference :tags, :company_field, index: true, foreign_key: true
    remove_reference :teams, :company_field, index: true, foreign_key: true
    remove_reference :trouble_names, :company_field, index: true, foreign_key: true
    remove_reference :troubles, :company_field, index: true, foreign_key: true

    remove_column :steps, :company_field_id

    drop_table :company_fields_teams
    drop_table :company_fields
  end
end
