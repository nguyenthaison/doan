class Api::V1::NotificationsController < Api::BaseController
  before_action :check_valid_field
  before_action :filter_by_field, only: :index

  def index
    has_more = false
    total_result, notifications = Notification.search_by params, current_user, session[:field_id]
    as_json_include = {}

    if params[:take].present?
      take = params[:take].to_i
      notifications = notifications.take take + 1
      has_more = notifications.size > take ? true : false
      notifications = notifications[0..-2] if has_more
    end
    as_json_include = params[:include].to_unsafe_hash.deep_symbolize_keys if params[:include]
    response_success notifications: notifications.
      as_json(methods: [:has_note, :status_in_top],
      include: as_json_include, current_user: current_user),
      count: total_result, has_more: has_more
  end

  def show
    as_json_include = JSON.parse(params[:include] || "").deep_symbolize_keys
    eager_load_include = ConvertJsonService.convert_to_eager_load_include as_json_include
    @notification = Notification.includes(Notification::JOIN_TABLES).
      includes(eager_load_include).find params[:id]
    response_success notification: @notification.json_data({include: as_json_include}, current_user)
  end

  def create
    if params[:only_validate]
      @notification.valid? ? response_success : response_fail(@notification.errors)
    elsif @notification.save
      response_success notification: @notification
    else
      response_fail @notification.errors
    end
  end

  def update
    if params[:only_validate]
      @notification.assign_attributes notification_params
      @notification.valid? ? response_success : response_fail(@notification.errors)
    else
      ActiveRecord::Base.transaction do
        begin
          @notification.client_notification_lines.each do |line|
            line.destroy if line
          end
          @notification.notification_tags.each do |tag|
            tag.destroy if tag.id
          end
          @notification.update_attributes notification_params
        rescue
          response_fail @notification.errors
        end
      end
      response_success notification: @notification
    end
  end

  def destroy
    if @notification.destroy
      response_success
    else
      response_fail
    end
  end

  def update_readed_user
    notification_user = @notification.notification_users.build user_id: current_user.id
    if notification_user.save
      response_success user: current_user, count_readed_users: @notification.notification_users.size
    else
      response_fail
    end
  end

  private
  def notification_params
    params.require(:notification).permit(Notification::ATTRIBUTE_PARAMS)
      .merge(field_params)
      .merge(userstamp_params)
  end
end
