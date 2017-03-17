class Api::V1::NotificationNotesController < Api::BaseController
  def create
    if @notification_note.save
      response_success NotificationNoteSerializer.new(@notification_note,
        {current_user: current_user})
    else
      response_fail @notification_note.errors
    end
  end

  def update
    if @notification_note.update_attributes notification_note_params
      response_success NotificationNoteSerializer.new(@notification_note,
        {current_user: current_user})
    else
      response_fail @notification_note.errors
    end
  end

  def destroy
    if @notification_note.destroy
      response_success note: @notification_note
    else
      response_fail @notification_note
    end
  end

  private
  def notification_note_params
    params.require(:notification_note).permit NotificationNote::ATTRIBUTES_PARAMS
  end
end
