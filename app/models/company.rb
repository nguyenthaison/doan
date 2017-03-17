class Company < ActiveRecord::Base
  include SmartAsJson
  include Validator
  include Search
  include Userstamp

  ATTRIBUTE_PARAMS = [:name, :name_kana, :postal_code, :address, :phone_number, :fax,
    :billing_address, :phone_number_billing, :fax_billing, :name_PIC_billing, :name_kana_PIC_billing,
    :name_PIC, :name_kana_PIC, :notes]
  ALLOWED_METHODS = [:field_num, :user_num]

  has_many :users
  has_many :fields
  has_many :teams

  validates :name, :name_PIC, presence: true, length: {maximum: 100}
  validates :name_kana, presence: true, length: {maximum: 150}
  validates :postal_code, :phone_number, presence: true, length: {maximum: 20}
  validates :address, presence: true, length: {maximum: 250}
  validates :fax, length: {maximum: 20}
  validates :name_PIC_billing, :name_kana_PIC_billing, length: {maximum: 40}
  validates :notes, length: {maximum: 600}
  validates :billing_address, length: {maximum: 250}
  validates :billing_address_zip, :phone_number_billing, :fax_billing, length: {maximum: 20}
  validates :postal_code, :phone_number, format: {with: VALID_PHONE_NUMBER_REGEX}
  validates :phone_number_billing, :fax_billing, :fax, :billing_address_zip, format: {with: VALID_PHONE_NUMBER_REGEX},
    allow_blank: true

  def user_num
    self.users.count
  end

  def field_num
    self.fields.count
  end

  class << self
    def search_by_query query
      fields = {id: "eq", name: "like"}
      search_follow_field query, fields
    end
  end
end
