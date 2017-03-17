class Api::V1::FlowsController < Api::BaseController
  before_action :filter_by_field, only: :index

  def index
    response_success base_index_response "flows"
  end

  def create
    if params[:only_validate]
      @flow.valid? ? response_success : response_fail(@flow.errors)
    elsif @flow.save
      if params["clone"]
        original_flow = Flow.find params[:original_flow_id]
        first_todo = original_flow.todos.first
        @flow.clone_todo first_todo
      end

      response_success flow: @flow.json_data
    else
      response_fail @flow.errors
    end
  end

  def show
    as_json_include = JSON.parse(params[:include] || "").deep_symbolize_keys
    eager_load_include = ConvertJsonService.convert_to_eager_load_include as_json_include
    flow = Flow.includes(eager_load_include).find params[:id]

    response_success flow: flow.as_json(generate_as_json_params)
  end

  def update
    ActiveRecord::Base.transaction do
      begin
        @flow.client_flow_lines.each do |line|
          line.destroy if line.id
        end
        @flow.flow_tags.each do |tag|
          tag.destroy if tag.id
        end
        @flow.update_attributes flow_params
      rescue
        response_fail @flow.errors
      end
    end
    response_success flow: Flow.find(@flow.id).json_data
  end

  def destroy
    if @flow.destroy
      response_success
    else
      response_fail flow: @flow
    end
  end

  private
  def flow_params
    params.require(:flow).permit(Flow::FLOW_ATTRIBUTES_PARAMS).merge(field_params)
      .merge(userstamp_params)
  end
end
