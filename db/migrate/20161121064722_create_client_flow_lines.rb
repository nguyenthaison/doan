class CreateClientFlowLines < ActiveRecord::Migration
  def change
    create_table :client_flow_lines do |t|
      t.references :client, index: true, foreign_key: true
      t.references :flow, index: true, foreign_key: true
      t.references :line, index: true, foreign_key: true
    end
  end
end
