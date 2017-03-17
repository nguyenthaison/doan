export default class BookmarkFolderForm extends BaseComponent {
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
    });
    this.type = type;
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

    switch(this.type) {
      case "folder":
        if (item.id) {
          API.BookmarkFolder.update(this.handleSaveCallback, item);
        } else {
          item["parent_id"] = this.props.parentFolderId;
          API.BookmarkFolder.create(this.handleSaveCallback, item);
        }
        break;
      case "bookmark":
        if (item.id) {
          API.Bookmark.update(this.handleSaveCallback, item);
        } else {
          item["bookmark_folder_id"] = this.props.parentFolderId;
          API.Bookmark.create(this.handleSaveCallback, item);
        }
        break;
    }
  }

  handleSaveCallback = (status, data) => {
    if (status) {
      if (this.state.item.id) {
        Helper.showMessage(t("common.message.updated_success"));
      } else {
        Helper.showMessage(t("common.message.created_success"));
      }

      this.props.onSaveCallback(this.type === "folder" ? data.bookmark_folder.parent_id :
        data.bookmark.bookmark_folder_id);
      this.handleClose();
    } else {
      Helper.showErrors(data, "bookmarks");
    }
  }

  handleChangeInputField = (fieldName, value) => {
    let item = update(this.state.item, {[fieldName]: {$set: value}});

    this.setState({
      item: item,
    });
  }

  renderTextInputField(fieldName, value, onChangePropFunction, options = {}) {
    return (
      <div className="form-group">
        <cm.TextField
          fieldName={t(`bookmarks.attributes.${fieldName}`)}
          value={value}
          fullWidth={true}
          onChange={onChangePropFunction}
          hintText={t(`bookmarks.form.placeholder.${fieldName}`)}
          {...options}
        />
      </div>
    );
  }

  render() {
    let buttonArea = (
      <div className="area-btn">
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

    let additionFields = (
      <div>
        {this.renderTextInputField("url", this.state.item.url,
          (event, value) => this.handleChangeInputField("url", value),
          {maxLength: 255})}
        {this.renderTextInputField("description", this.state.item.description,
          (event, value) => this.handleChangeInputField("description", value),
          {maxLength: 255})}
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
            {this.renderTextInputField("name",
              this.state.item.name,
              (event, value) => this.handleChangeInputField("name", value),
              {maxLength: 255})}
            {this.type === "folder" ? null : additionFields}
            {buttonArea}
          </div>
        </cm.Dialog>
      </div>
    );
  }
}
