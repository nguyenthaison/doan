class Api::V1::TagsController < Api::BaseController
  before_action :check_valid_field
  before_action :filter_by_field, only: :index

  def index
    render plain: fetch_index_response("tags")
    response.content_type = "application/json"
  end

  def create
    if params[:only_validate] == "true"
      @tag.valid? ? response_success : response_fail(@tag.errors)
    elsif @tag.save
      response_success tag: @tag
    else
      response_fail @tag.errors
    end
  end

  def update
    if params[:only_validate] == "true"
      @tag.assign_attributes tag_params
      @tag.valid? ? response_success : response_fail(@tag.errors)
    elsif @tag.update_attributes tag_params
      response_success tag: @tag
    else
      response_fail @tag.errors
    end
  end

  def batch_update
    tags = Tag.batch_update params[:data]
    tags ? response_success : response_fail(tags.errors)
  end

  def destroy
    if @tag.destroy
      response_success
    else
      response_fail tag: @tag
    end
  end

  private
  def tag_params
    params.require(:tag).permit(Tag::ATTRIBUTES_PARAMS)
      .merge(field_params)
      .merge(userstamp_params)
  end
end
