class Api::V1::ClaimsController < Api::BaseController
  before_action :check_valid_field
  before_action :filter_by_field, only: :index

  def index
    render plain: fetch_index_response("claims")
    response.content_type = "application/json"
  end

  def create
    if params[:only_validate] == "true"
      @claim.valid? ? response_success : response_fail(@claim.errors)
    elsif @claim.save
      response_success claim: @claim.as_json(include: {attachments: {}})
    else
      response_fail @claim.errors
    end
  end

  def update
    if params[:only_validate] == "true"
      @claim.assign_attributes claim_params
      @claim.valid? ? response_success : response_fail(@claim.errors)
    elsif @claim.update_attributes claim_params
      response_success claim: @claim.as_json(include: {attachments: {}})
    else
      response_fail @claim.errors
    end
  end

  def destroy
    if @claim.destroy
      response_success
    else
      response_fail claim: @claim
    end
  end

  private
  def claim_params
    params.require(:claim).permit(Claim::CLAIM_ATTRIBUTES_PARAMS)
      .merge(field_params)
      .merge(userstamp_params)
  end
end
