class Api::V1::FieldsController < Api::BaseController
  before_action :filter_by_company, only: :index

  def index
    response = base_index_response "fields"
    response_success response
  end

  def create
    if params[:only_validate] == "true"
      @field.valid? ? response_success : response_fail(@field.errors)
    elsif @field.save
      response_success field: @field
    else
      response_fail @field.errors
    end
  end

  def update
    role = current_user.role
    if role == "pms_admin"
      if params[:only_validate] == "true"
        @field.assign_attributes field_params
        @field.valid? ? response_success : response_fail(@field.errors)
      elsif @field.update_attributes field_params
        response_success field: @field
      else
        response_fail @field.errors
      end
    elsif role == "admin"
      if params[:only_validate] == "true"
        response_success
      elsif Field.update_team params, @field
        response_success field: @field
      else
        response_fail @field.errors
      end
    end
  end

  def destroy
    if @field.destroy
      response_success
    else
      response_fail field: @field
    end
  end

  private
  def field_params
    params.require(:field).permit(Field::ATTRIBUTE_PARAMS).merge userstamp_params
  end
end
