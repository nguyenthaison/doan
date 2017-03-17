class Claim < ApplicationRecord
  include SmartAsJson

  CLAIM_ATTRIBUTES_PARAMS = [:title, :content, :field_id, attachment_ids: []]

  has_many :attachments, as: :attachmentable, dependent: :destroy

  validates :title, uniqueness: {scope: :field_id, case_sensitive: false},
    presence: true, length: {maximum: 100}
end
