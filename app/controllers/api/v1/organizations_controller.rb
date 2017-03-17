class Api::V1::OrganizationsController < Api::BaseController
  before_action :filter_by_company, only: :index

  def index
    render plain: fetch_index_response("organizations")
    response.content_type = "application/json"
  end

  def create
    if params[:only_validate] == "true"
      @organization.valid? ? response_success : response_fail(@organization.errors)
    elsif @organization.save
      response_success organization: @organization
    else
      response_fail @organization.errors
    end
  end

  def update
    if params[:only_validate] == "true"
      @organization.assign_attributes organization_params
      @organization.valid? ? response_success : response_fail(@organization.errors)
    elsif @organization.update_attributes organization_params
      response_success organization: @organization
    else
      response_fail @organization.errors
    end
  end

  def destroy
    if @organization.destroy
      response_success
    else
      response_fail organization: @organization
    end
  end

  private
  def organization_params
    params.require(:organization).permit(Organization::ATTRIBUTES_PARAMS)
    .merge(company_params)
    .merge(userstamp_params)
  end
end
