class ChangeFaquestions < ActiveRecord::Migration
  def change
    change_column :faquestions, :question, :text
    change_column :faquestions, :answer, :text
    change_column :faquestions, :helpfuls, :integer, default: 0
  end
end
