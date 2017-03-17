class Api::V1::TodosController < Api::BaseController
  def index
    response_success base_index_response "todos"
  end

  def create
    if @todo.save
      response_success todo: @todo.as_json(include: {nodes: {}, attachments: {}})
    else
      response_fail @todo.errors
    end
  end

  def update
    if @todo.update_attributes todo_params
      response_success todo: @todo.as_json(include: {nodes: {}, attachments: {}})
    else
      response_fail @todo.errors
    end
  end

  def destroy
    if @todo.destroy
      response_success
    else
      response_fail
    end
  end

  private
  def todo_params
    params.require(:todo).permit Todo::ATTRIBUTE_PARAMS
  end
end
