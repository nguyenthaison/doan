class DeleteNoteColumnClient < ActiveRecord::Migration
  def change
    remove_column :clients, :note
  end
end
