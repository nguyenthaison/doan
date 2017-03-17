class Api::V1::LinesController < Api::BaseController
  before_action :check_valid_field
  before_action :filter_by_field, only: :index

  def index
    render plain: fetch_index_response("lines")
    response.content_type = "application/json"
  end

  def show
    response_success line: @line.json_data
  end

  def create
    if params[:only_validate] == "true"
      @line.valid? ? response_success : response_fail(@line.errors)
    elsif @line.save
      Line.createLineTrouble params, Line.last.id
      response_success line: @line
    else
      response_fail @line.errors
    end
  end

  def update
    if params[:only_validate] == "true"
      @line.assign_attributes line_params
      @line.valid? ? response_success : response_fail(@line.errors)
    elsif @line.update_attributes line_params
      Line.createLineTrouble params, params[:line][:id]
      response_success line: @line
    else
      response_fail @line.errors
    end
  end

  def destroy
    if @line.destroy
      response_success
    else
      response_fail line: @line
    end
  end

  private
  def line_params
    params.require(:line).permit(Line::LINE_ATTRIBUTES_PARAMS)
      .merge(field_params)
      .merge(userstamp_params)
  end
end
