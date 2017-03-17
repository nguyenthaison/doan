class User < ActiveRecord::Base
  include SmartAsJson
  include Validator
  include Search
  include Userstamp

  attr_accessor :present_pass, :current_role

  SENSITIVE_ATTRIBUTES = %w[encrypted_password reset_password_token]

  ATTRIBUTES_PARAMS = [:login_id, :name, :name_kana, :password, :position_id, :company_id,
    :organization_id, :department_id, :team_id, :phone_number, :internal_number,
    :email, :role, :notes, :current_password, :password, :password_confirmation,
    client_user_lines_attributes: [:id, :client_id, :line_id]]
  JOIN_TABLES = %i[clients lines position organization department team]
  acts_as_paranoid

  belongs_to :department
  belongs_to :position
  belongs_to :organization
  belongs_to :team
  belongs_to :company

  has_many :faquestion_users
  has_many :notification_addresses
  has_many :notification_address_teams, through: :notification_addresses
  has_many :notification_users
  has_many :community_users
  has_many :client_user_lines, dependent: :destroy
  has_many :lines, through: :client_user_lines
  has_many :clients, through: :client_user_lines
  has_many :comment_users
  has_many :comments, through: :comment_users

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable, :timeoutable, authentication_keys: [:login_id]

  enum role: [:member, :manager, :admin, :pms_admin]

  validates :login_id, uniqueness: {case_sensitive: false}, presence: true, length: {maximum: 20},
    format: {with: VALID_LOGIN_ID_REGEX}
  validates :password, length: {minimum: 6, maximum: 20}, allow_nil: true,
    format: {with: VALID_PASSWORD_REGEX}, if: proc {password.present?}
  validates :password, presence: true, if: proc {present_pass}
  validates :password_confirmation, presence: true, if: proc {present_pass}

  validates :name, presence: true, length: {maximum: 40}
  validates :name_kana, length: {maximum: 40},
    format: {with: VALID_NAME_KANA_REGEX}, if: proc {name_kana.present?}
  validates :email, uniqueness: true, length: {maximum: 150},
    if: proc {email.present?}
  validates :phone_number, length: {minimum: 7, maximum: 40},
    format: {with: VALID_PHONE_NUMBER_REGEX}, if: proc {phone_number.present?}
  validates :internal_number, length: {maximum: 40},
    format: {with: VALID_PHONE_NUMBER_REGEX}, if: proc {internal_number.present?}
  validates :role, presence: true
  validates :notes, length: {maximum: 600}
  validates :company, presence: true, if:
    proc {role != "pms_admin"}
  validates :organization, :department, :team, presence: true, if:
    proc {role != "pms_admin" && role != "admin"}

  accepts_nested_attributes_for :client_user_lines
  delegate :can?, :cannot?, to: :ability

  scope :filter_by_field_id, ->field_id do
    joins(:team).where "teams.field_id = ?", field_id
  end

  scope :filter_by_role, ->roles do
    where "role IN (?)", roles
  end

  scope :filter_by_has_email, ->email do
    where.not(email: [nil, ''])
  end

  scope :user_receive_notice, -> team_id, field_id do
    joins(:notification_addresses, :notification_address_teams)
    .where(notification_addresses: {notification_type: "help", field_id: field_id},
      notification_address_teams: {team_id: team_id})
  end

  def ability
    @ability ||= Ability.new self
  end

  def timeout_in
    session_timeout = 90
    if ENV["SESSION_TIMEOUT"]
      session_timeout = ENV["SESSION_TIMEOUT"].to_i
    end
    session_timeout.minutes
  end

  def email_required?
    false
  end

  def valid_user?
    case self.role
    when "pms_admin", "admin"
      true
    when "manager", "member"
      team = self.team
      return true if team&.field&.is_valid
      false
    end
  end

  class << self
    def search_by_query query
      fields = {"users.id": "eq", "users.login_id": "like", "users.name": "like",
        "users.name_kana": "like"}
      search_follow_field query, fields
    end
  end
end
