class Api::V1::NotificationAddressesController < Api::BaseController
  before_action :filter_by_field, only: :index

  def index
    response_success base_index_response "notification_addresses"
  end

  def create
    if params[:only_validate] == "true"
      @notification_address.valid? ? response_success : response_fail(@notification_address.errors)
    elsif @notification_address.save
      response_success notification_address: @notification_address
    else
      response_fail @notification_address.errors
    end
  end

  def update
    if params[:only_validate] == "true"
      notification_address = NotificationAddress.new notification_address_params
      notification_address.valid? ? response_success : response_fail(notification_address.errors)
    else
      ActiveRecord::Base.transaction do
        begin
          @notification_address.notification_address_teams.each do |notification_address_team|
            notification_address_team.destroy if notification_address_team.id
          end
          @notification_address.update_attributes notification_address_params
        rescue
          response_fail @notification_address.errors
        end
      end
      response_success notification_address: @notification_address
    end
  end

  def destroy
    if @notification_address.destroy
      response_success
    else
      response_fail notification_address: @notification_address
    end
  end

  private
  def notification_address_params
    params.require(:notification_address).permit(NotificationAddress::ATTRIBUTE_PARAMS)
      .merge(field_params).merge(userstamp_params)
  end
end
