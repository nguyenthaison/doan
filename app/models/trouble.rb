class Trouble < ActiveRecord::Base
  include SmartAsJson
  include Search
  include Userstamp

  ATTRIBUTE_PARAMS = %i[name parent_id code]
  acts_as_paranoid

  has_many :line_big_troubles, class_name: LineTrouble.name, foreign_key: "big_trouble_id", dependent: :destroy
  has_many :line_medium_troubles, class_name: LineTrouble.name, foreign_key: "medium_trouble_id", dependent: :destroy
  has_many :line_small_troubles, class_name: LineTrouble.name, foreign_key: "small_trouble_id", dependent: :destroy
  has_many :line_tiny_troubles, class_name: LineTrouble.name, foreign_key: "tiny_trouble_id", dependent: :destroy
  has_many :lines, through: :line_troubles
  has_many :childs, class_name: "Trouble", foreign_key: "parent_id", dependent: :destroy

  belongs_to :parent, class_name: "Trouble", foreign_key: "parent_id"
  belongs_to :creator, -> {with_deleted}, class_name: "User", foreign_key: "creator_id"
  belongs_to :updater, -> {with_deleted}, class_name: "User", foreign_key: "updater_id"
  belongs_to :field

  validates :name, presence: true, length: {maximum: 80}
  validates :code, presence: true, length: {maximum: 10}
  validates :parent_id, presence: true

  before_destroy :update_community_faquestion

  after_save :clear_redis
  after_destroy :clear_redis

  def clear_redis
    $redis.del "troubles"
  end

  def update_community_faquestion
    ["Faquestion", "Community"].each do |model_name|
      model_name.classify.constantize.where("big_trouble_id = :trouble_id OR medium_trouble_id = :trouble_id OR
        small_trouble_id = :trouble_id OR tiny_trouble_id = :trouble_id", trouble_id: self.id)
        .update_all big_trouble_id: nil, medium_trouble_id: nil, small_trouble_id: nil,
        tiny_trouble_id: nil
    end
  end

  class << self
    def search_by_query query
      fields = {}
      search_follow_field query, fields
    end
  end
end
