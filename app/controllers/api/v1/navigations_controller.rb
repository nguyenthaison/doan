class Api::V1::NavigationsController < Api::BaseController
  before_action :filter_by_field, only: :index

  def index
    response_success base_index_response "navigations"
  end

  def show
    as_json_include = JSON.parse(params[:include] || "").deep_symbolize_keys
    eager_load_include = ConvertJsonService.convert_to_eager_load_include as_json_include
    navigation = Navigation.includes(eager_load_include).find params[:id]

    response_success navigation: navigation.as_json(generate_as_json_params)
  end

  def create
    if @navigation.save
      if params[:clone]
        original_navigation = Navigation.find params[:copy_navigation_id]
        @navigation.clone_navigation_data original_navigation
      else
        @steps = filter_by Step.all, field_id: session[:field_id], active: true
        @navigation.update_attributes step_ids: @steps.ids
      end
      response_success navigation: @navigation
    else
      response_fail @navigation.errors
    end
  end

  def update
    if @navigation.update_attributes navigation_params
      if @navigation.publish_date && @navigation.publish_date > Time.current
        PublishNavigationWorker.perform_at(@navigation.publish_date, @navigation.id)
      end
      response_success @navigation.as_json(only: [:id], methods: [:published])
    else
      response_fail navigation: @navigation.errors
    end
  end

  def import_flow
    flow_id = params[:flow_id]
    navigation_step_id = params[:navigation_step_id]
    parent_todo_id = params[:parent_todo_id]
    node_id = params[:node_id]

    new_copy_todos = @navigation.import_flow navigation_step_id, flow_id, parent_todo_id, node_id

    response_success todos: new_copy_todos.
      map {|todo| todo.as_json({include: {nodes: {}, parent_todo: {}, attachments: {}}})}
  end

  def destroy
    if @navigation.destroy
      response_success
    else
      response_fail navigation: @navigation
    end
  end

  private
  def navigation_params
    params.require(:navigation).permit(Navigation::ATTRIBUTE_PARAMS)
      .merge(field_params)
      .merge(userstamp_params)
  end
end
