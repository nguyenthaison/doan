export default class NotificationNoteItem extends BaseComponent {
  constructor(props) {
    super(props);
  }

  confirmDeleteNote = () => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.delete"),
      this.handleDeleteNote);
  }

  handleDeleteNote = () => {
    API.NotificationNote.delete(this.handleDeleteNoteCallBack, this.props.note);
  }

  handleDeleteNoteCallBack = (status, data) => {
    if(status) {
      this.props.onClickDelete(data.note);
    }
  }

  renderEditIcon() {
    return (
      <span
        className="edit-note pointer"
        onClick={() => this.props.onClickEdit(this.props.note)}>
        <i className="material-icons">mode_edit</i>
        {t("common.edit")}
      </span>
    );
  }

  renderDeleteIcon() {
    return (
      <span
        onClick={this.confirmDeleteNote}
        className="delete-note pointer">
        <i className="material-icons">delete</i>
        {t("common.delete")}
      </span>
    );
  }

  render() {
    let note = this.props.note;
    return (
      <div className="row note">
        <div className="row note-header">
          <div className="top-infor">
            <div className="left-infor">
              <span>
                <i className="material-icons">info</i>
                {t("notifications.detail.add_note")}
              </span>
            </div>
            <div className="right-infor">
              <span className="note-created-at">
                {t("common.attributes.created_at")}:
                {note.created_at}
              </span>
              {note.authorized.edit ? this.renderEditIcon() : null}
              {note.authorized.delete ? this.renderDeleteIcon() : null}
            </div>
          </div>
        </div>
        <div className="row note-content white-space">
          {note.content}
        </div>
      </div>
    );
  }
}
