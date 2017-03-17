class Api::V1::ClientsController < Api::BaseController
  before_action :check_valid_field
  before_action :filter_by_field, only: :index

  def index
    render plain: fetch_index_response("clients")
    response.content_type = "application/json"
  end

  def show
    response_success client: @client
  end

  def create
    if params[:only_validate] == "true"
      @client.valid? ? response_success : response_fail(@client.errors)
    elsif @client.save
      response_success client: @client
    else
      response_fail @client.errors
    end
  end

  def update
    if params[:only_validate] == "true"
      @client.assign_attributes client_params
      @client.valid? ? response_success : response_fail(@client.errors)
    elsif @client.update_attributes client_params
      response_success client: @client
    else
      response_fail @client.errors
    end
  end

  def destroy
    if @client.destroy
      response_success
    else
      response_fail client: @client
    end
  end

  private
  def client_params
    params.require(:client).permit(Client::CLIENT_ATTRIBUTES_PARAMS)
      .merge(field_params)
      .merge(userstamp_params)
  end
end
