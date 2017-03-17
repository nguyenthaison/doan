class Api::V1::HelpsController < Api::BaseController
  before_action :check_valid_field
  before_action :filter_by_field, only: :index

  def index
    render plain: fetch_index_response("helps")
    response.content_type = "application/json"
  end

  def create
    if params[:only_validate] == "true"
      @help.valid? ? response_success : response_fail(@help.errors)
    elsif @help.save
      response_success help: @help
    else
      response_fail @help.errors
    end
  end

  def update
    if params[:only_validate] == "true"
      @help.assign_attributes help_params
      @help.valid? ? response_success : response_fail(@help.errors)
    elsif @help.update_attributes help_params
      response_success help: @help
    else
      response_fail @help.errors
    end
  end

  private
  def help_params
    params.require(:help).permit(Help::ATTRIBUTES_PARAMS)
      .merge(announcer: current_user.id)
      .merge(userstamp_params)
      .merge(field_params)
  end
end
