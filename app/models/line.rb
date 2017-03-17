class Line < ActiveRecord::Base
  include SmartAsJson
  include Validator
  include Search
  include Userstamp

  LINE_ATTRIBUTES_PARAMS = %i[code name name_kana client_id free_dial_number notes]
  JOIN_TABLES = %i[line_troubles]
  acts_as_paranoid

  belongs_to :trouble
  belongs_to :client
  belongs_to :user
  belongs_to :field

  has_many :client_notification_lines, dependent: :destroy
  has_many :client_faquestion_lines, dependent: :destroy
  has_many :client_user_lines, dependent: :destroy
  has_many :faquestions, through: :client_faquestion_lines
  has_many :line_troubles, dependent: :destroy
  has_many :troubles, through: :line_troubles
  has_many :navigations, dependent: :destroy

  auto_strip_attributes *LINE_ATTRIBUTES_PARAMS, nullify: false
  validates :free_dial_number, format: {with: VALID_PHONE_NUMBER_REGEX},
    if: proc {free_dial_number.present?}
  validates :name_kana, presence: true, length: {maximum: 80}, format: {with: VALID_NAME_KANA_REGEX}
  validates :client_id, presence: true
  validates :name, :code, uniqueness: {scope: :field_id, case_sensitive: false},
    presence: true, length: {maximum: 80}

  after_save :clear_redis
  after_destroy :clear_redis

  scope :filter_by_ownership, ->(user_id) do
    user = User.find_by id: user_id
    unless user && user.admin?
      joins(:client).joins("INNER JOIN client_user_lines ON clients.id = client_user_lines.client_id
        AND client_user_lines.line_id IS NULL OR client_user_lines.line_id = lines.id")
        .where("client_user_lines.user_id = ?", user_id).distinct
    end
  end

  def clear_redis
    $redis.del "lines"
  end

  def json_data options = {}
    options = options.merge({
      include: {
        line_troubles: {include: %i[big_trouble medium_trouble small_trouble tiny_trouble]},
      }
    })
    as_json(options).merge({
      creator: creator,
      updater: updater,
    })
  end

  class << self
    def createLineTrouble params, line_id
      params_trouble = params[:line][:line_troubles]
      trouble_key = ["big_trouble", "medium_trouble", "small_trouble", "tiny_trouble"];
      line_trouble_ids = [];
      if params_trouble
        params_trouble.each {|_, value| line_trouble_ids.push(value[:id].to_i)}
        LineTrouble.where("id NOT iN (?) AND line_id = (?)", line_trouble_ids, line_id).delete_all
        params_trouble.each do |_, value|
          value.reject!{|key| trouble_key.include? key}
          value = ActiveSupport::HashWithIndifferentAccess.new value
          if !value[:id]
            value[:line_id] = line_id
            line_trouble = LineTrouble.new value
            line_trouble.save
          end
        end
      else
        LineTrouble.where("line_id = (?)", line_id).delete_all
      end
    end

    def search_by_query query
      fields = {id: "eq", code: "like", name: "like", free_dial_number: "like"}
      search_follow_field query, fields
    end
  end
end
