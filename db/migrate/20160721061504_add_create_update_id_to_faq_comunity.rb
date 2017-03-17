class AddCreateUpdateIdToFaqComunity < ActiveRecord::Migration
  def change
    add_column :faquestions, :creator_id, :integer, after: :priority
    add_column :faquestions, :updater_id, :integer, after: :creator_id
    add_column :communities, :creator_id, :integer, after: :helpfuls
    add_column :communities, :updater_id, :integer, after: :creator_id
  end
end
