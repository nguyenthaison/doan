module ApplicationHelper
  def full_title page_title = ""
    base_title = t "project_name"
    page_title.present? ? "#{page_title} | #{base_title}" : base_title
  end

  def i18n_enum model_name, enum
    enum = enum.to_s.pluralize
    model_name = model_name.to_s
    model_name.classify.constantize.public_send(enum).keys.map do |key|
      OpenStruct.new key: key, value: I18n.t("#{model_name.pluralize}.#{enum}.#{key}")
    end.flatten
  end

  def options_for_select_by class_name
    class_name.constantize.all.collect {|c| [c.name, c.id]}
  end
end
