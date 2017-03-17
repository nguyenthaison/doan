desc "Clean all temp uploaded files"
task clean_temp_files: :environment do
  Attachment.expire.delete_all
end
