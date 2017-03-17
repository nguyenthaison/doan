class Client < ActiveRecord::Base
  include SmartAsJson
  include Validator
  include Search
  include Userstamp

  CLIENT_ATTRIBUTES_PARAMS = %i[name short_name address phone_number name_kana notes code]

  auto_strip_attributes *CLIENT_ATTRIBUTES_PARAMS, nullify: false
  acts_as_paranoid

  belongs_to :field

  has_many :faquestions, through: :client_faquestion_lines
  has_many :client_notification_lines, dependent: :destroy
  has_many :notifications, through: :client_notification_lines
  has_many :lines, dependent: :destroy
  has_many :client_faquestion_lines, dependent: :destroy
  has_many :client_community_lines, dependent: :destroy
  has_many :client_user_lines, dependent: :destroy
  has_many :navigations, dependent: :destroy

  validates :name, :name_kana, presence: true, length: {maximum: 80}
  validates :short_name, presence: true, length: {maximum: 3},
    format: {with: VALID_SHORT_NAME_REGEX}
  validates :address, length: {maximum: 300}
  validates :notes, length: {maximum: 600}
  validates :name_kana, format: {with: VALID_NAME_KANA_REGEX}
  validates :phone_number, length: {minimum: 7, maximum: 40},
    format: {with: VALID_PHONE_NUMBER_REGEX}, if: :has_phone_number?
  validates :code, length: {maximum: 10}
  validates :name, :short_name, :code, uniqueness: {scope: :field_id, case_sensitive: false},
    presence: true

  after_save :clear_redis
  after_destroy :clear_redis

  scope :filter_by_ownership, ->(user_id) do
    user = User.find_by id: user_id
    unless user && user.admin?
      joins(:client_user_lines).where("client_user_lines.user_id = ?", user_id).distinct
    end
  end

  def clear_redis
    $redis.del "clients"
  end

  class << self
    def search_by_query query
      fields = {id: "eq", code: "like", name: "like", short_name: "like"}
      search_follow_field query, fields
    end
  end

  private
  def has_phone_number?
    phone_number.present?
  end
end
