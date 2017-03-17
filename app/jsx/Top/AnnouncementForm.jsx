export default class AnnouncementForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      announcement: {key: "announcement"},
    };
  }

  open = (data) => {
    this.setState({
      show: true,
      announcement: data || this.state.announcement,
    });
  }

  close = () => {
    this.setState({
      show: false,
    });
  }

  handleClose = () => {
    this.close();
  }

  handleClickSubmit = () => {
    if (this.state.announcement.field_id) {
      API.Setting.update(this.handleUpdateSettings, this.state.announcement);
    } else {
      API.Setting.create(this.handleUpdateSettings, this.state.announcement);
    }
  }

  handleUpdateSettings = (status, data) => {
    if (!status) return;
    App.updateSettings(data);
    this.props.onUpdate(data);
    this.close();
  }

  handleChangeTextField = (fieldName, newValue) => {
    let newState = update(this.state.announcement, {[fieldName]: {$set: newValue}});
    this.setState({announcement: newState});
  }

  renderButton() {
    return(
      <div>
        <cm.RaisedButton
          style={{minWidth: "110px"}}
          label={t("common.save")}
          primary={true}
          onClick={this.handleClickSubmit}
        />
      </div>
    )
  }

  render() {
    let announcement = this.state.announcement;
    let content = announcement ? announcement.content : "";

    return (
      <div>
        <cm.Dialog
          actions={this.renderButton()}
          onRequestClose={this.handleClose}
          open={this.state.show}
          dialogType={t("common.edit")}>
          <div className="base-master-form">
            <cm.TextField
              name="content"
              fullWidth={true}
              value={content}
              onChange={(event, value) => this.handleChangeTextField("content", value)}
            />
          </div>
        </cm.Dialog>
      </div>
    )
  }
}
