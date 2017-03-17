class Api::V1::UsersController < Api::BaseController
  before_action :filter_by_role, only: :index

  def index
    response_success base_index_response "users"
  end

  def create
    if params[:only_validate] == "true"
      @user.valid? ? response_success : response_fail(@user.errors)
    elsif @user.save
      response_success user: @user
    else
      response_fail @user.errors
    end
  end

  def update
    if params[:only_validate] == "true"
      @user.assign_attributes user_params
      @user.valid? ? response_success : response_fail(@user.errors)
    else
      ActiveRecord::Base.transaction do
        begin
          @user.client_user_lines.each do |line|
            line.destroy if line.id
          end
          @user.update_attributes user_params
        rescue
          response_fail @user.errors
        end
      end
      response_success user: @user
    end
  end

  def destroy
    if @user.destroy
      response_success
    else
      response_fail user: @user
    end
  end

  def update_password
    @user = current_user
    if @user.update_with_password user_params.merge({present_pass: true})
      bypass_sign_in @user
      response_success @user
    else
      response_fail @user.errors
    end
  end

  private
  def user_params
    user_params = params.require(:user).permit(User::ATTRIBUTES_PARAMS)

    if !current_user.pms_admin?
      user_params[:company_id] = current_user.company ? current_user.company.id : nil
    end

    if user_params[:role]
      permited_roles = []

      case current_user.role
      when "pms_admin"
        permited_roles = ["admin"]

      when "admin"
        permited_roles = ["manager"]

      when "manager"
        permited_roles = ["member", "manager"]
      end

      user_params[:role] = permited_roles.last unless permited_roles.include? user_params[:role]
    end

    user_params.merge userstamp_params
  end

  def filter_by_role
    role = current_user.role
    role = "manager" if session[:field_id] && role == "admin"
    filter = case role
    when "pms_admin"
      {
        role: User.roles["admin"],
      }
    when "admin"
      {
        role: User.roles["manager"],
        company_id: current_user.company_id,
      }
    when "manager"
      field_id = session[:field_id]
      {
        role: [User.roles["member"], User.roles["manager"]],
        field_id: [field_id],
      }
    else
      {
        id: nil,
      }
    end
    params[:filter] = params[:filter] ? params[:filter].merge(filter) : filter
  end
end
