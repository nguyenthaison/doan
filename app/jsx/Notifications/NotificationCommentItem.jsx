export default class NotificationCommentItem extends BaseComponent {
  constructor(props) {
    super(props);
  }

  confirmDeleteComment = () => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.delete"),
      () => this.handleDeleteComment(this.props.comment));
  }

  handleDeleteComment = () => {
    API.Comment.delete(this.handleDeleteCommentCallBack, this.props.comment);
  }

  handleDeleteCommentCallBack = (status, data) => {
    if(status) {
      this.props.onChange(data.comments);
    }
  }

  renderEditIcon() {
    return (
      <span className="edit-comment" onClick={() => this.props.onClickEdit(this.props.comment)}>
        <i className="material-icons">mode_edit</i>
        {t("common.edit")}
      </span>
    );
  }

  renderDeleteIcon() {
    return (
      <span className="delete-comment" onClick={this.confirmDeleteComment}>
        <i className="material-icons">delete</i>
        {t("common.delete")}
      </span>
    );
  }

  render() {
    let comment = this.props.comment;

    return (
      <div className="comment">
        <div className="created-at">
          <span>
            {t("common.attributes.created_at")}:
            {comment.created_at}
          </span>
        </div>
        <div className="comment-wrapper">
          <div className="row">
            <div className="top-infor">
              <div className="left-infor">
                <span>
                  <i className="material-icons" style={{color: theme.secondaryColor}}>account_circle</i>
                  {comment.creator_name}
                </span>
                {comment.authorized.edit ? this.renderEditIcon() : null}
                {comment.authorized.delete ? this.renderDeleteIcon() : null}
              </div>
            </div>
            <div className="content-comment white-space">
              <cm.RegexLink text={comment.content} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
