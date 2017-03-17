class CreateFlowTags < ActiveRecord::Migration
  def change
    create_table :flow_tags do |t|
      t.references :flow, index: true, foreign_key: true
      t.references :tag, index: true, foreign_key: true
      t.integer :parent_tag_id
    end
  end
end
