export default class HelpDialog extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      navigationId: null,
    }
  }

  open = (navigationId) => {
    this.setState({
      show: true,
      navigationId: navigationId,
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

  handleClickAccept = () => {
    let help = {navigation_id: this.state.navigationId, user_id: App.auth.id}
    API.Help.create(this.handleCreateHelpCallback, help);
  }

  handleCreateHelpCallback = (status, data) => {
    if (!status) return;
    Helper.showMessage(t("helps.notice_confirm"));
    this.handleClose();
  }

  renderButton() {
    return (
      <span className="group-button">
        <cm.RaisedButton
          label={t("common.cancel")}
          secondary={true}
          onClick={this.handleClose}/>
        <cm.RaisedButton
          label={t("common.accept")}
          primary={true}
          onClick={this.handleClickAccept}
        />
      </span>
    )
  }

  renderHelpContent() {
    return (
      <div>
        <p>
          <b>{t("helps.notice_help")}</b><br />
          <span>{t("helps.notice_to_manager")}</span>
        </p>
        <span>
          {this.renderButton()}
        </span>
      </div>
    )
  }

  render() {
    return (
      <div>
        <cm.Dialog
          title={t("navigations.master.help_notification")}
          className="help-dialog"
          contentClassName="dialog-content"
          onRequestClose={this.handleClose}
          open={this.state.show}>
          {this.renderHelpContent()}
        </cm.Dialog>
      </div>
    );
  }
}
