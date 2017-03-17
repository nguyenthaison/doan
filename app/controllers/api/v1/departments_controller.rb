class Api::V1::DepartmentsController < Api::BaseController
  before_action :filter_by_company, only: :index

  def index
    render plain: fetch_index_response("departments")
    response.content_type = "application/json"
  end

  def create
    if params[:only_validate] == "true"
      @department.valid? ? response_success : response_fail(@department.errors)
    elsif @department.save
      response_success department: @department
    else
      response_fail @department.errors
    end
  end

  def update
    if params[:only_validate] == "true"
      @department.assign_attributes department_params
      @department.valid? ? response_success : response_fail(@department.errors)
    elsif @department.update_attributes department_params
      response_success department: @department
    else
      response_fail @department.errors
    end
  end

  def destroy
    if @department.destroy
      response_success
    else
      response_fail department: @department
    end
  end

  private
  def department_params
    params.require(:department).permit(Department::ATTRIBUTES_PARAMS)
      .merge(company_params)
      .merge(userstamp_params)
  end
end
