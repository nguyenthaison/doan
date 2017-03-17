class Step < ActiveRecord::Base
  DEFAULT_STEPS_PER_FIELD = 5

  belongs_to :field

  has_many :navigation_steps, dependent: :destroy
  has_many :navigations, through: :navigation_steps
  has_many :flows

  validates :field_id, presence: true
  validates :name, presence: true, length: {maximum: 100}

  class << self
    def create_default_step_navigation field_id
      DEFAULT_STEPS_PER_FIELD.times do |n|
        Step.create name: I18n.t("steps.default_name"),
          field_id: field_id
      end
    end
  end
end
