class Api::V1::ManualFilesController < Api::BaseController
  skip_load_and_authorize_resource only: [:create]

  def index
    response_success base_index_response "manual_files"
  end

  def create
    manual_file = ManualFile.new attachment: params[:attachment],
      folder_id: params[:folder_id], creator_id: current_user.id

    if manual_file.save
      if Rails.env === "production"
        url = manual_file.presigned_url
        manual_file.update link_file: url
      else
        manual_file.update link_file: "#{root_url}api/v1/download/#{manual_file.id}"
      end
      response_success manual_file: manual_file.as_json(include: {creator: {}})
    else
      response_fail manual_file.errors.messages.except :attachment
    end
  end

  def update
    if @manual_file.update_attributes manual_file_params
      response_success manual_file: @manual_file
    else
      response_fail @manual_file.errors
    end
  end

  def download
    byebug
    if Rails.env === "production"
      manual_file = ManualFile.find_by id: params[:id]
      response_success url: manual_file.link_file
    else
      manual_file = ManualFile.find_by id: params[:id]

      if manual_file
        send_file(manual_file.attachment.path,
          type: manual_file.attachment_content_type,
          disposition: "attachment",
          x_sendfile: true,
          filename: manual_file.attachment_file_name)
      end
    end
  end

  def destroy
    if @manual_file.destroy
      response_success manual_file: @manual_file
    else
      response_fail manual_file: @manual_file
    end
  end

  private
  def manual_file_params
    params.require(:manual_file).permit(ManualFile::ATTRIBUTES_PARAMS)
      .merge(userstamp_params)
  end
end
