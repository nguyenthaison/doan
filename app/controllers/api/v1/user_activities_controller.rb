class Api::V1::UserActivitiesController < Api::BaseController
  def index
    response_success base_index_response "user_activities"
  end
end
