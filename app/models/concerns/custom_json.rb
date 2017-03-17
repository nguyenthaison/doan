module CustomJson
  extend ActiveSupport::Concern
  def as_json(options = { })
    super(options).merge({
      created_at: "#{I18n.l created_at, format: '%Y-%m-%d %H:%M'}",
      updated_at: "#{I18n.l updated_at, format: '%Y-%m-%d %H:%M'}",
    })
  end
end
