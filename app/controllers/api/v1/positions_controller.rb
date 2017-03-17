class Api::V1::PositionsController < Api::BaseController
  before_action :filter_by_company, only: :index

  def index
    response_success base_index_response("positions")
  end

  def create
    if params[:only_validate] == "true"
      @position.valid? ? response_success : response_fail(@position.errors)
    elsif @position.save
      response_success position: @position
    else
      response_fail @position.errors
    end
  end

  def update
    if params[:only_validate] == "true"
      @position.assign_attributes position_params
      @position.valid? ? response_success : response_fail(@position.errors)
    elsif @position.update_attributes position_params
      response_success position: @position
    else
      response_fail @position.errors
    end
  end

  def destroy
    if @position.destroy
      response_success
    else
      response_fail position: @position
    end
  end

  private
  def position_params
    params.require(:position).permit(Position::ATTRIBUTES_PARAMS)
      .merge(company_params)
      .merge(userstamp_params)
  end
end
