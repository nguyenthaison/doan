class AddCreatedAtUpdatedAtToFlows < ActiveRecord::Migration[5.0]
  def change
    add_column :flows, :created_at, :datetime
    add_column :flows, :updated_at, :datetime
  end
end
