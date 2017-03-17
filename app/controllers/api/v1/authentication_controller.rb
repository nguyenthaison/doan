class Api::V1::AuthenticationController < Api::BaseController
  skip_load_and_authorize_resource
  before_action :check_valid_field

  def index
    response_success AuthenticationSerializer.new(current_user,
      {field_id: session[:field_id]})
  end

  def change_field
    field_id = nil
    if params[:field_id].present?
      field = Field.find params[:field_id]
      if field.company_id == current_user.company_id
        field_id = params[:field_id].to_i
      end
    end

    session[:field_id] = field_id
    response_success
  end

  def get_contribution
    response_success contribution: ContributionSerializer.new(current_user)
  end
end
