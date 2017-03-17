class Api::V1::SettingsController < Api::BaseController
  def create
    if params[:only_validate] == "true"
      @setting.valid? ? response_success : response_fail(@setting.errors)
    elsif @setting.save
      response_success @setting
    else
      response_fail @setting.errors
    end
  end

  def update
    if params[:only_validate] == "true"
      @setting.assign_attributes setting_params
      @setting.valid? ? response_success : response_fail(@setting.errors)
    elsif @setting.update_attributes setting_params
      response_success @setting
    else
      response_fail @setting.errors
    end
  end

  private
  def setting_params
    params.require(:setting).permit(Setting::ATTRIBUTE_PARAMS).
      merge field_params
  end
end
