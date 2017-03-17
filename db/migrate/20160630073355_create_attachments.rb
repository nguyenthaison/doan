class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.references :attachmentable, polymorphic: true, index: true
      t.timestamps null: false
      t.integer :creator_id
      t.integer :updater_id
    end
  end
end
