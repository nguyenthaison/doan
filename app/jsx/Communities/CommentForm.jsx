export default class CommentForm extends BaseComponent {
  constructor(props) {
    super(props);

    this.state =  {
      comment: this.props.comment || {},
    };
  }

  showValidateErrors = (data) => {
    if (typeof data === "object") {
      for (var key in data) {
        Helper.showMessage(t(`comments.attributes.${key}`) + " " + data[key][0], "error");
      }
    } else {
      Helper.showMessage(data, "error");
    }
  }

  handleChangeCommentInputField = (fieldName, value) => {
    let comment = update(this.state.comment, {content: {$set: value}});

    this.setState({comment: comment});
  }

  handlePostComment = () => {
    let comment = update(this.state.comment,{$merge: this.props.extendParams});
    if(!this.props.withoutAttachment) {
      let attachmentIds = this.refs.fileUpload.getAttachmentIds();
      comment["attachment_ids"] = attachmentIds.length == 0 ? [""] : attachmentIds;
    }

    if (this.props.comment) {
      API[this.props.apiName].update(
        (status, data) => this.handleSaveCommentCallback(status, data, false),
        comment);
    } else {
      API[this.props.apiName].create(
        (status, data) => this.handleSaveCommentCallback(status, data, true),
        comment);
    }
  }

  handleSaveCommentCallback = (status, data, isCreate) => {
    if (status) {
      this.props.onSubmit(data, isCreate);
    } else {
      this.showValidateErrors(data);
    }
  }

  renderSelectAttachment() {
    return (
      <div>
        <span>
          <i className="material-icons">insert_photo</i>
          {t("comments.form.upload_file")}
        </span>
        <cm.FileUploader ref="fileUpload" defaultFiles={this.state.comment.attachments || []} />
      </div>
    );
  }

  render() {
    let options = {fullWidth: true, multiLine: true, rowsMax: 10, maxLength: this.props.maxLengthContent};
    let comment = this.state.comment;

    return (
      <div className="row new-comment-form">
        <div className="form-content">
          <div className="form-group">
            <cm.TextField
              fieldName={t("comments.form.content")}
              required={true}
              value={comment.content}
              counting={true}
              onChange={this.handleChangeCommentInputField}
              hintText={t("comments.form.placeholder")}
              {...options}
            />
          </div>
          {this.props.withoutAttachment ? null : this.renderSelectAttachment()}
        </div>
        <div className="pull-right">
          <cm.RaisedButton
            className="cancel-button"
            onClick={() => this.props.onCancel()}
            secondary={true}
            label={t("common.cancel")}
          />
          <cm.RaisedButton
            onClick={this.handlePostComment}
            primary={true}
            label={t("comments.button.post")}
          />
        </div>
      </div>
    );
  }
}

CommentForm.defaultProps = {
  withoutAttachment: false,
  extendParams: {},
  maxLengthContent: 1000,
};
