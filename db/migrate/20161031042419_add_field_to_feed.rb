class AddFieldToFeed < ActiveRecord::Migration
  def change
    add_reference :feeds, :field, index: true, foreign_key: true
  end
end
