class Api::V1::CommentsController < Api::BaseController
  before_action :init_class_serializer, only: [:create, :update, :destroy]
  before_action :load_object_type, only: [:create, :destroy]

  def create
    if @comment.save
      @comment.create_user_activity current_user
      @object_type.update_attribute :comment_count, @object_type.comment_count + 1
      response_success @class_serializer.new(@comment, {current_user: current_user})
    else
      response_fail @comment.errors
    end
  end

  def update
    if @comment.update_attributes comment_params
      response_success @class_serializer.new(@comment, {current_user: current_user})
    else
      response_fail @comment.errors
    end
  end

  def destroy
    if @comment.destroy
      @object_type.update_attribute :comment_count, @object_type.comment_count - 1
      remain_comments = @object_type.comments.map {|comment|
        @class_serializer.new comment, {current_user: current_user}}
      response_success comments: remain_comments
    else
      response_fail comment: @comment
    end
  end

  def update_reaction
    response_success reaction: @comment.update_votes(current_user)
  end

  private
  def init_class_serializer
    @class_serializer = (@comment.commentable_type + "CommentSerializer").classify.constantize
  end

  def load_object_type
    @object_type = @comment.commentable_type.classify.constantize.find @comment.commentable_id
  end

  def comment_params
    params.require(:comment).permit(Comment::ATTRIBUTES_PARAMS).merge userstamp_params
  end
end
