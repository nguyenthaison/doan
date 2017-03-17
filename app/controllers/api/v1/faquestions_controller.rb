class Api::V1::FaquestionsController < Api::V1::BaseFaqController
  before_action :check_valid_field
  before_action :filter_by_field, only: :index
  before_action :set_method_params, only: :index

  def create
    if params[:only_validate]
      @faquestion.valid? ? response_success : response_fail(@faquestion.errors)
    else
      if check_community_is_moved
        response_fail moved_to_faq: true
      else
        create_faq
      end
    end
  end

  def index
    response_success base_index_response "faquestions", {method_params: @method_params}
  end

  def show
    response_json_show
  end

  def update
    ActiveRecord::Base.transaction do
      begin
        @faquestion.client_faquestion_lines.each do |line|
          line.destroy if line.id
        end
        @faquestion.faquestion_tags.each do |tag|
          tag.destroy if tag.id
        end
        @faquestion.update_attributes faquestion_params
      rescue
        response_fail @faquestion.errors
      end
    end
    response_success faquestion: @faquestion
  end

  def destroy
    if @faquestion.destroy
      response_success
    else
      response_fail
    end
  end

  BaseFaq::REACTIONS.each do |reaction|
    define_method "update_#{reaction}" do
      response_success reaction: @faquestion.update_reaction(reaction, current_user)
    end
  end

  def get_data_for_cloning
    comment = Comment.find params[:comment_id]
    community = Community.find comment.commentable_id
    answer_attachments = Attachment.clone_attachments comment.attachments
    question_attachments = Attachment.clone_attachments community.attachments

    faq = CommunitySerializer.new(community).as_json.merge!({
      answer: comment.content,
      attachments: question_attachments,
      answer_attachments: answer_attachments,
      community_id: comment.commentable_id
    })

    response_success faq: faq
  end

  private
  def faquestion_params
    params[:faquestion][:tag_ids] ||= []
    remove_unnecessary_trouble_for_faquestion
    params.require(:faquestion).permit(Faquestion::FAQUESTION_ATTRIBUTES_PARAMS)
      .merge(field_params)
      .merge(userstamp_params)
  end

  def check_community_is_moved
    community = Community.find_by_id faquestion_params[:community_id]
    community && community.moved_to_faq
  end

  def create_faq
    if @faquestion.save
      if @faquestion.community_id
        @faquestion.community.update_attributes moved_to_faq: true
      end
      response_success faquestion: @faquestion
    else
      response_fail @faquestion.errors
    end
  end

  def set_method_params
    @method_params = {
      faq_user: [current_user],
      authorized: [current_user],
    }
  end
end
