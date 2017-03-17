class Api::V1::TroubleNamesController < Api::BaseController
  before_action :check_valid_field
  before_action :filter_by_field, only: :index

  def index
    response_success base_index_response("trouble_names")
  end

  def update
    if params[:only_validate] == "true"
      @trouble_name.assign_attributes trouble_name_params
      @trouble_name.valid? ? response_success : response_fail(@trouble_name.errors)
    elsif @trouble_name.update_attributes trouble_name_params
      response_success trouble_name: @trouble_name
    else
      response_fail @trouble_name.errors
    end
  end

  private
  def trouble_name_params
    params.require(:trouble_name).permit(TroubleName::ATTRIBUTE_PARAMS)
      .merge(field_params)
      .merge(userstamp_params)
  end
end
