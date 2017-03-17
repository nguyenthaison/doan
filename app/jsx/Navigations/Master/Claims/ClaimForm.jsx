export default class ClaimForm extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      claim: this.props.claim || {field_id: App.auth.field_id},
    };
  }

  handleCreateClaim = () => {
    let claim = this.state.claim;
    claim["attachment_ids"] = this.refs.fileUpload.getAttachmentIds();

    API.Claim.create(this.handleCreateClaimCallBack, claim);
  }

  handleCreateClaimCallBack = (status, data) => {
    if (status) {
      Helper.showMessage(t("common.message.created_success"));
      this.props.onCreate(data.claim);
    } else {
      Helper.showErrors(data, "claims");
    }
  }

  handleUpdateClaim = () => {
    let claim = this.state.claim;
    let attachmentIds = this.refs.fileUpload.getAttachmentIds();
    claim["attachment_ids"] = attachmentIds.length == 0 ? [""] : attachmentIds;

    API.Claim.update(this.handleUpdateClaimCallBack, claim);
  }

  handleUpdateClaimCallBack = (status, data) => {
    if (status) {
      Helper.showMessage(t("common.message.updated_success"));
      this.props.onUpdateCallback(data.claim);
    } else {
      Helper.showErrors(data, "claims");
    }
  }

  handleChangeInputField = (fieldName, value) => {
    let claim = update(this.state.claim, {[fieldName]: {$set: value}});

    this.setState({
      claim: claim,
    });
  }

  handleCancelClaimForm = () => {
    this.props.onClose();
  }

  renderTextInputField(fieldName, value, onChangePropFunction, options = {}) {
    return (
      <div className="form-group">
        <cm.TextField
          fieldName={t(`claims.attributes.${fieldName}`)}
          value={value}
          fullWidth={true}
          onChange={onChangePropFunction}
          hintText={t(`claims.form.placeholder.${fieldName}`)}
          {...options}
        />
      </div>
    );
  }

  renderSelectAttachment() {
    return (
      <div className="select-attachment">
        <span className="upload-file-title">
          <i className="material-icons" style={{color: theme.secondaryColor}}>insert_photo</i>
          {t("comments.form.upload_file")}
        </span>
        <cm.FileUploader ref="fileUpload" defaultFiles={this.state.claim.attachments} />
      </div>
    );
  }

  renderSubForm() {
    return (
      <div className="subform-todo">
        <div className="content-todo">
          {this.renderTextInputField("content", this.state.claim.content,
            (event, value) => this.handleChangeInputField("content", value),
            {multiLine: true, rowsMax: 10, maxLength: 600, counting: true})}
        </div>
        <div className="attachments-todo">
          {this.renderSelectAttachment()}
        </div>

        <div className="cancel-save-group-button">
          <cm.RaisedButton
            onClick={this.handleCancelClaimForm}
            label={t("common.cancel")}
            secondary={true}
          />
          <cm.RaisedButton
            primary={true}
            style={{marginLeft: 15}}
            onClick={this.state.claim.id ? this.handleUpdateClaim : this.handleCreateClaim}
            label={this.state.claim.id ? t("common.update") : t("claims.form.create")}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="todo-form">
        <div className="title-todo">
          <input
            maxLength={100}
            type="text"
            value={this.state.claim.title || ""}
            onChange={(event) => this.handleChangeInputField("title", event.target.value)}
            placeholder={t("claims.form.placeholder.title")}>
          </input>
        </div>
        {this.renderSubForm()}
      </div>
    );
  }
}
