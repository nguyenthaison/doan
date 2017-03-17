class AddFlagMoveToFaq < ActiveRecord::Migration
  def change
    add_column :communities, :moved_to_faq, :boolean, default: false
    add_column :faquestions, :community_id, :integer, index: true, foreign: true
  end
end
