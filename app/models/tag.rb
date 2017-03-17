class Tag < ActiveRecord::Base
  include SmartAsJson
  include Search
  include Userstamp

  ATTRIBUTES_PARAMS = %i[name notes parent_id]
  acts_as_paranoid

  has_many :community_tags, class_name: CommunityTag.name,
    foreign_key: "tag_id", dependent: :destroy
  has_many :community_parent_tags, class_name: CommunityTag.name,
    foreign_key: "parent_tag_id", dependent: :destroy
  has_many :faquestion_tags, class_name: FaquestionTag.name,
    foreign_key: "tag_id", dependent: :destroy
  has_many :faquestion_parent_tags, class_name: FaquestionTag.name,
    foreign_key: "parent_tag_id", dependent: :destroy
  has_many :notification_tags, class_name: NotificationTag.name,
    foreign_key: "tag_id", dependent: :destroy
  has_many :notification_parent_tags, class_name: NotificationTag.name,
    foreign_key: "parent_tag_id", dependent: :destroy


  belongs_to :parent, class_name: "Tag", foreign_key: "parent_id"
  belongs_to :field

  validates :name, presence: true, length: {maximum: 80}
  validates :notes, length: {maximum: 600}

  after_create :set_order
  after_save :clear_redis
  after_destroy :clear_redis

  def clear_redis
    $redis.del "tags"
  end

  class << self
    def search_by_query query
      fields = {id: "eq", name: "like"}
      search_follow_field query, fields
    end

    def batch_update data
      ActiveRecord::Base.transaction do
        begin
          Tag.update data.keys, data.values
        rescue
          nil
        end
      end
    end
  end

  private
  def set_order
    self.update order_number: id
  end
end
