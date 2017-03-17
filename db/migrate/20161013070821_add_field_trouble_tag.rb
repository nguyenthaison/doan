class AddFieldTroubleTag < ActiveRecord::Migration
  def change
    add_reference :tags, :user_region, index: true, foreign_key: true
    add_reference :tags, :company, index: true, foreign_key: true

    add_reference :troubles, :user_region, index: true, foreign_key: true
    add_reference :troubles, :company, index: true, foreign_key: true

    add_reference :trouble_names, :user_region, index: true, foreign_key: true
    add_reference :trouble_names, :company, index: true, foreign_key: true
  end
end
