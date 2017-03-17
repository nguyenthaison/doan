class CreateClientFaquestionLines < ActiveRecord::Migration
  def change
    create_table :client_faquestion_lines do |t|
      t.references :client, index: true, foreign: true
      t.references :faquestion, index: true, foreign: true
      t.references :line, index: true, foreign: true
      t.timestamps null: false
    end
  end
end
