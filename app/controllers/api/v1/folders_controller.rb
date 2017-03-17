class Api::V1::FoldersController < Api::BaseController
  def index
    response_success base_index_response "folders"
  end

  def show
    as_json_include = JSON.parse(params[:include] || "").deep_symbolize_keys
    eager_load_include = ConvertJsonService.convert_to_eager_load_include as_json_include
    folder = Folder.includes(eager_load_include).find params[:id]

    response_success folder: folder.as_json(generate_as_json_params)
  end

  def create
    folder = Folder.new folder_params

    if folder.save
      response_success folder: folder.as_json(include: {creator: {}})
    else
      response_fail folder.errors
    end
  end

  def update
    if @folder.update_attributes folder_params
      response_success folder: @folder
    else
      response_fail @folder.errors
    end
  end

  def destroy
    if @folder.destroy
      response_success folder: @folder
    else
      response_fail folder: @folder
    end
  end

  private
  def folder_params
    params.require(:folder).permit(Folder::FOLDER_ATTRIBUTES_PARAMS).merge(field_params)
      .merge(userstamp_params)
  end
end
