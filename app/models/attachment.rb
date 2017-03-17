class Attachment < ActiveRecord::Base
  include SmartAsJson
  IMAGE_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/gif"]
  VIDEO_TYPES = ["video/mp4"]

  has_attached_file :attachment,
    styles: lambda {|a| a.instance.get_style},
    restricted_characters: false

  belongs_to :attachmentable, polymorphic: true

  validates_attachment_content_type :attachment,
    content_type: IMAGE_TYPES + VIDEO_TYPES

  validates_attachment_size :attachment, less_than: lambda {|a| a.check_file_size}

  scope :expire, -> {where "attachmentable_id is null and created_at < ?", Time.now - 1.day}

  def check_file_size
    if is_image_type?
      3.megabytes
    elsif is_video_type?
      130.megabytes
    end
  end

  def get_style
    if is_image_type?
      {thumb: "256x256"}
    elsif is_video_type?
      {
        thumb: {geometry: "300x300#", format: "jpg"},
      }
    end
  end

  def is_image_type?
    IMAGE_TYPES.include? attachment_content_type
  end

  def is_video_type?
    VIDEO_TYPES.include? attachment_content_type
  end

  def as_json options={}
    super.merge({
      url: attachment.url,
      thumb_url: attachment.url(:thumb),
    })
  end

  class << self
    def clone_attachments attachments
      new_attachments = []
      attachments.each do |att|
        new_attachment = Attachment.create attachment: att.attachment
        new_attachments.push new_attachment
      end
      new_attachments
    end
  end
end
