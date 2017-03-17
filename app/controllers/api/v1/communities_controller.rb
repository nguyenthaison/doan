class Api::V1::CommunitiesController < Api::V1::BaseFaqController
  before_action :check_valid_field
  before_action :assign_user_for_community, only: :create
  before_action :filter_by_field, only: :index
  before_action :set_method_params, only: :index

  def index
    response_success base_index_response "communities", {method_params: @method_params}
  end

  def show
    response_json_show
  end

  def create
    if params[:only_validate]
      @community.valid? ? response_success : response_fail(@community.errors)
    elsif @community.save
      @community.create_user_activity current_user
      response_success community: @community
    else
      response_fail @community.errors
    end
  end

  def update
    ActiveRecord::Base.transaction do
      begin
        @community.client_community_lines.each do |line|
          line.destroy if line
        end
        @community.community_tags.each do |tag|
          tag.destroy if tag.id
        end
        @community.update_attributes community_params
      rescue
        response_fail @community.errors
      end
    end
    response_success faquestion: @community
  end

  def destroy
    if @community.destroy
      response_success
    else
      response_fail
    end
  end

  BaseFaq::REACTIONS.each do |reaction|
    define_method "update_#{reaction}" do
      response_success reaction: @community.update_reaction(reaction, current_user)
    end
  end

  private
  def community_params
    params[:community][:tag_ids] ||= []
    remove_unnecessary_trouble_for_community

    params.require(:community).permit(Community::COMMUNITY_ATTRIBUTES_PARAMS)
      .merge(field_params)
      .merge(userstamp_params)
  end

  def set_method_params
    @method_params = {
      faq_user: [current_user],
      authorized: [current_user],
    }
  end
end
