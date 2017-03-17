class Api::V1::BookmarkFoldersController < Api::BaseController
  def show
    as_json_include = JSON.parse(params[:include] || "").deep_symbolize_keys
    eager_load_include = ConvertJsonService.convert_to_eager_load_include as_json_include
    bookmark_folder = BookmarkFolder.includes(eager_load_include).find params[:id]

    response_success bookmark_folder: bookmark_folder.as_json(generate_as_json_params)
  end

  def create
    bookmark_folder = BookmarkFolder.new bookmark_folder_params

    if bookmark_folder.save
      response_success bookmark_folder: bookmark_folder.as_json(include: {creator: {}})
    else
      response_fail bookmark_folder.errors
    end
  end

  def update
    if @bookmark_folder.update_attributes bookmark_folder_params
      response_success bookmark_folder: @bookmark_folder
    else
      response_fail @bookmark_folder.errors
    end
  end

  def destroy
    if @bookmark_folder.destroy
      response_success bookmark_folder: @bookmark_folder
    else
      response_fail bookmark_folder: @bookmark_folder
    end
  end

  private
  def bookmark_folder_params
    params.require(:bookmark_folder).permit(BookmarkFolder::ATTRIBUTES_PARAMS).merge(field_params)
      .merge(userstamp_params)
  end
end
