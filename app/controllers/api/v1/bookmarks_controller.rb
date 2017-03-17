class Api::V1::BookmarksController < Api::BaseController
  def create
    bookmark = Bookmark.new bookmark_params

    if bookmark.save
      response_success bookmark: bookmark.as_json(include: {creator: {}})
    else
      response_fail bookmark.errors
    end
  end

  def update
    if @bookmark.update_attributes bookmark_params
      response_success bookmark: @bookmark
    else
      response_fail @bookmark.errors
    end
  end

  def destroy
    if @bookmark.destroy
      response_success bookmark: @bookmark
    else
      response_fail bookmark: @bookmark
    end
  end

  private
  def bookmark_params
    params.require(:bookmark).permit(Bookmark::ATTRIBUTES_PARAMS)
      .merge(userstamp_params)
  end
end
