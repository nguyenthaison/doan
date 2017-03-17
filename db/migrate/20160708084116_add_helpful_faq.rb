class AddHelpfulFaq < ActiveRecord::Migration
  def change
    add_column :faquestions, :favorites, :integer, after: :helpfuls , default: 0
    add_column :faquestion_users, :helpful, :boolean, after: :favorite, default: false
  end
end
