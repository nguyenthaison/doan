class ManualFile < ApplicationRecord
  include SmartAsJson, Userstamp, Search

  ATTRIBUTES_PARAMS = %i[folder_id attachment_file_name file_name]
  ALLOWED_METHODS = %i[path_name]

  acts_as_paranoid

  has_attached_file :attachment
  belongs_to :folder

  validates_attachment_content_type :attachment,
    content_type: [
      # "application/octet-stream",
      # "application/vnd.ms-excel",
      # "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      # "application/vnd.ms-powerpoint",
      # "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      # "application/pdf",
      # "application/msword",
      # "image/jpeg",
      # "image/png",
      # "image/gif",
      # "video/mp4"
    ]

  validates_attachment_size :attachment, less_than: 130.megabytes
  validates :attachment_file_name, uniqueness: {scope: :folder_id}
  validates :file_name, presence: true, on: :update

  before_create :add_file_name

  def presigned_url
    s3 = Aws::S3::Client.new(
      region: ENV["S3_REGION"],
      access_key_id: ENV["ACCESS_KEY_ID"],
      secret_access_key: ENV["SECRET_ACCESS_KEY"]
    )
    signer = Aws::S3::Presigner.new(client: s3)
    url = signer.presigned_url(
      :get_object,
      bucket: ENV["BUCKET"],
      key: attachment.path)
  end

  def path_name
    self.folder.self_and_ancestors.pluck(:name).join "/"
  end

  class << self
    def search_by_query conditions
      like_query = "%#{sanitize_sql_like conditions[:query].strip}%"
      parent_folder = Folder.find conditions[:folder_id]
      folder_ids = parent_folder.self_and_descendants.pluck :id
      ManualFile.where "folder_id IN (:folder_ids) AND file_name LIKE :query",
        folder_ids: folder_ids,
        query: like_query
    end
  end

  private
  def add_file_name
    self.file_name = self.attachment_file_name
  end
end
