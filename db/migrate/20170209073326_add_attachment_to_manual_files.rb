class AddAttachmentToManualFiles < ActiveRecord::Migration
  def change
    add_attachment :manual_files, :attachment
  end
end
