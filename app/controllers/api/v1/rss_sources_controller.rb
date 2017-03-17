class Api::V1::RssSourcesController < Api::BaseController
  def index
    response_success base_index_response "rss_sources"
  end
end
