class CreateClientUserLines < ActiveRecord::Migration
  def change
    create_table :client_user_lines do |t|
      t.references :client, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.references :line, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
