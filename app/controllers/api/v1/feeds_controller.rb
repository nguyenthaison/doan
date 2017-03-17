class Api::V1::FeedsController < Api::BaseController
  before_action :filter_by_field, only: :index

  def index
    response_success base_index_response "feeds"
  end
end
