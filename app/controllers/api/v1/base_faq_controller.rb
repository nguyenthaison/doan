class Api::V1::BaseFaqController < Api::BaseController
  def response_json_show
    as_json_include = JSON.parse(params[:include] || "").deep_symbolize_keys
    eager_load_include = ConvertJsonService.convert_to_eager_load_include as_json_include

    constant_name = controller_name.classify.constantize
    obj = constant_name.includes(constant_name::JOIN_TABLES).includes(eager_load_include)
      .find params[:id]
    obj.update_views current_user if params[:update_view].present?

    response = {
      faquestion: obj.json_data({include: as_json_include}, current_user),
      authorized: {edit: can?(:edit, obj), delete: can?(:destroy, obj)}
    }
    if params[:with_related].present?
      response[:related_faqs] = obj.find_related "faquestion"
      response[:related_coms] = obj.find_related "community"
    end
    response_success response
  end

  private
  %i(faquestion community).each  do |faq_type|
    define_method "assign_user_for_#{faq_type}" do
      params[faq_type][:user_id] = current_user.id
    end

    define_method "remove_unnecessary_trouble_for_#{faq_type}" do
      BaseFaq::TROUBLE_FIELDS.each do |trouble|
        params[faq_type][trouble] ||= ""
      end
    end
  end
end
