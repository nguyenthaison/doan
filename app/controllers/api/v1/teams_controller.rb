class Api::V1::TeamsController < Api::BaseController
  before_action :check_valid_field
  before_action :filter_by_company, only: :index
  before_action :filter_by_field, only: :index

  def index
    render plain: fetch_index_response("teams")
    response.content_type = "application/json"
  end

  def create
    if params[:only_validate] == "true"
      @team.valid? ? response_success : response_fail(@team.errors)
    elsif @team.save
      response_success team: @team
    else
      response_fail @team.errors
    end
  end

  def update
    if params[:only_validate] == "true"
      @team.assign_attributes team_params
      @team.valid? ? response_success : response_fail(@team.errors)
    elsif @team.update_attributes team_params
      response_success team: @team
    else
      response_fail @team.errors
    end
  end

  def destroy
    if @team.destroy
      response_success
    else
      response_fail team: @team
    end
  end

  private
  def team_params
    params.require(:team).permit(Team::ATTRIBUTES_PARAMS)
    .merge(company_params)
    .merge(userstamp_params)
  end
end
