class CreateTableRelateToCommunity < ActiveRecord::Migration
  def change
    change_column :communities, :question, :text
    change_column :communities, :helpfuls, :integer, default: 0
    change_column :communities, :views, :integer, default: 0

    add_column :communities, :user_id, :integer, foreign_key: true
    add_column :communities, :big_trouble_id, :integer
    add_column :communities, :medium_trouble_id, :integer
    add_column :communities, :small_trouble_id, :integer
    add_column :communities, :tiny_trouble_id, :integer
    add_column :communities, :deleted_at, :datetime
    add_column :communities, :favorites, :integer, after: :helpfuls , default: 0

    add_column :community_users, :helpful, :boolean, default: false
    add_column :community_users, :favorite, :boolean, default: false
    add_column :community_users, :view, :boolean, default: false

    create_table :client_community_lines do |t|
      t.references :client, index: true, foreign: true
      t.references :community, index: true, foreign: true
      t.references :line, index: true, foreign: true
    end

    create_table :community_positions do |t|
      t.references :community, index: true, foreign: true
      t.references :position, index: true, foreign: true
    end
  end
end
