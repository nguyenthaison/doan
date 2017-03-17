class Api::V1::TroublesController < Api::BaseController
  before_action :check_valid_field
  before_action :filter_by_field, only: :index

  def index
    render plain: fetch_index_response("troubles")
    response.content_type = "application/json"
  end

  def create
    if params[:only_validate] == "true"
      @trouble.valid? ? response_success : response_fail(@trouble.errors)
    elsif @trouble.save
      response_success trouble: @trouble
    else
      response_fail @trouble.errors
    end
  end

   def update
    if params[:only_validate] == "true"
      @trouble.assign_attributes trouble_params
      @trouble.valid? ? response_success : response_fail(@trouble.errors)
    elsif @trouble.update_attributes trouble_params
      response_success trouble: @trouble
    else
      response_fail @trouble.errors
    end
  end

  def destroy
    if @trouble.destroy
      response_success
    else
      response_fail trouble: @trouble
    end
  end

  private
  def trouble_params
    params.require(:trouble).permit(Trouble::ATTRIBUTE_PARAMS)
      .merge(field_params)
      .merge(userstamp_params)
  end
end
