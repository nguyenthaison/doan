class Api::V1::CompaniesController < Api::BaseController
  def index
    response_success base_index_response "companies"
  end

  def create
    if params[:only_validate] == "true"
      @company.valid? ? response_success : response_fail(@company.errors)
    elsif @company.save
      response_success company: @company
    else
      response_fail @company.errors
    end
  end

  def update
    if params[:only_validate] == "true"
      @company.assign_attributes company_params
      @company.valid? ? response_success : response_fail(@company.errors)
    elsif @company.update_attributes company_params
      response_success company: @company
    else
      response_fail @company.errors
    end
  end

  def destroy
    if @company.destroy
      response_success
    else
      response_fail company: @company
    end
  end

  private
  def company_params
    params.require(:company).permit(Company::ATTRIBUTE_PARAMS).merge userstamp_params
  end
end
