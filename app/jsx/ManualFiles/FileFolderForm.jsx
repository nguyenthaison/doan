export default class FileFolderForm extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      item: {},
      show: false,
    }
  }

  open = (item, type) => {
    this.setState({
      item: item || {},
      show: true,
      type: type,
    });
  }

  close = () => {
    this.setState({
      item: {},
      show: false,
    });
  }

  handleClose = () => {
    this.close();
  }

  handleSave = () => {
    let item = this.state.item;

    if (item.id) {
      switch(this.state.type) {
        case "folder":
          API.Folder.update(this.handleSaveCallback, item);
          break;
        case "file":
          API.ManualFile.update(this.handleSaveCallback, item);
          break;
      }
    } else {
      item["parent_id"] = this.props.parentFolderId;
      API.Folder.create(this.handleSaveCallback, item);
    }
  }

  handleKeyDownSubmit = (event) => {
    if (event.keyCode === 13) {
      this.handleSave();
    }
  }

  handleSaveCallback = (status, data) => {
    if (status) {
      if (this.state.item.id) {
        Helper.showMessage(t("common.message.updated_success"));
      } else {
        Helper.showMessage(t("common.message.created_success"));
      }

      this.props.onSaveCallback(this.state.type === "folder" ? data.folder.parent_id :
        data.manual_file.folder_id);
      this.handleClose();
    } else {
      Helper.showErrors(data, "folder");
    }
  }

  handleChangeInputField = (fieldName, value) => {
    let item = update(this.state.item, {[fieldName]: {$set: value}});

    this.setState({
      item: item,
    });
  }

  handleClickDetele = () => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.delete"),
      this.handleConfirmDelete);
  }

  handleConfirmDelete = () => {
    if (this.state.type === "folder") {
      API.Folder.delete(this.handleDeleteCallback, this.state.item.id);
    } else {
      API.ManualFile.delete(this.handleDeleteCallback, this.state.item.id);
    }
  }

  handleDeleteCallback = (status, data) => {
    if (status) {
      this.props.onSaveCallback(this.state.type === "folder" ? data.folder.parent_id :
        data.manual_file.folder_id);
      this.close();
      Helper.showMessage(t("common.message.deleted_success"));
    }
  }

  renderTextInputField(fieldName, value, onChangePropFunction, options = {}) {
    return (
      <div className="form-group">
        <cm.TextField
          fieldName={t(`folder.attributes.${fieldName}`)}
          value={value}
          fullWidth={true}
          onChange={onChangePropFunction}
          onKeyDown={this.handleKeyDownSubmit}
          hintText={t(`folder.form.placeholder.${fieldName}`)}
          {...options}
        />
      </div>
    );
  }

  render() {
    let fieldName = this.state.type === "folder" ? "name" : "file_name";
    let buttonArea = (
      <div className="area-btn">
        {this.state.item.id ?
          <cm.RaisedButton
            className="btn-delete"
            label={t("common.delete")}
            secondary={true}
            onClick={this.handleClickDetele}
            style={{minWidth: "110px"}}
          /> : null
        }
        <cm.RaisedButton
          onClick={this.handleClose}
          label={t("common.cancel")}
          secondary={true}
        />
        <cm.RaisedButton
          primary={true}
          style={{marginLeft: 15}}
          onClick={this.handleSave}
          label={t("common.save")}
        />
      </div>
    );

    return (
      <div>
        <cm.Dialog
          title={this.state.item.id ? t("common.edit") : t("common.create")}
          contentClassName="dialog-content"
          onRequestClose={this.handleClose}
          open={this.state.show}
        >
          <div className="base-master-form manual-file-form">
            {this.renderTextInputField(fieldName,
              this.state.item[fieldName],
              (event, value) => this.handleChangeInputField(fieldName, value),
              {maxLength: 255})}
            {buttonArea}
          </div>
        </cm.Dialog>
      </div>
    );
  }
}
