class RemoveReferenceAndRenameTableUserRegion < ActiveRecord::Migration
  def change
    remove_reference :teams, :user_region, index: true, foreign_key: true
    remove_reference :users, :user_region, index: true, foreign_key: true
    remove_reference :clients, :user_region, index: true, foreign_key: true
    remove_reference :tags, :user_region, index: true, foreign_key: true
    remove_reference :trouble_names, :user_region, index: true, foreign_key: true
    remove_reference :troubles, :user_region, index: true, foreign_key: true
    remove_reference :company_user_region_teams, :user_region, index: true, foreign_key: true
    remove_reference :company_user_regions, :user_region, index: true, foreign_key: true
    remove_reference :company_user_region_teams, :company_user_region, index: true, foreign_key: true

    remove_column :notification_masters, :user_region_id

    rename_table :user_regions, :fields
    rename_table :company_user_region_teams, :company_fields_teams
    rename_table :company_user_regions, :company_fields

    add_reference :teams, :field, index: true, foreign_key: true
    add_reference :clients, :field, index: true, foreign_key: true
    add_reference :tags, :field, index: true, foreign_key: true
    add_reference :trouble_names, :field, index: true, foreign_key: true
    add_reference :troubles, :field, index: true, foreign_key: true
    add_reference :company_fields_teams, :field, index: true, foreign_key: true
    add_reference :company_fields, :field, index: true, foreign_key: true
    add_reference :notification_masters, :field, index: true, foreign_key: true
    add_reference :company_fields_teams, :company_field, index: true, foreign_key: true
  end
end
