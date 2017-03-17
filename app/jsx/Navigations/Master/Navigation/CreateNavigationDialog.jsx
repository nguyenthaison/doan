import ClientLines from "./ClientLines";

export default class CreateNavigationDialog extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      copyNavigation: null,
    };
  }

  openDialog(copyNavigation = null) {
    this.setState({
      open: true,
      copyNavigation: copyNavigation,
    });
  }

  handleCloseDialog = () => {
    this.setState({
      open: false,
    });
  }

  handleCreate = () => {
    let options = {};
    let navigation = this.refs.clientLine.getSelectedClienLineId();

    if (this.state.copyNavigation) {
      navigation["clone"] = true;
      options = {
        clone: true,
        copy_navigation_id: this.state.copyNavigation.id,
      };
    }
    API.Navigation.create(this.handleCreateCallBack,
      navigation, options
    );
  }

  handleCreateCallBack = (status, data) => {
    if (status) {
      this.handleCloseDialog();
      Helper.transitionTo("/masterNavigation/navigations/" + data.navigation.id);
    } else {
      Helper.showErrors(data, "navigations");
    }
  }

  render() {
    return (
      <cm.Dialog
        title={t("navigations.master.form.title")}
        onRequestClose={this.handleCloseDialog}
        open={this.state.open}
        className="search-faq-dialog create-navigation-dialog"
      >
        <ClientLines
          ref="clientLine" />
        <div className="row form-commands center">
          <div className="group-button">
            <cm.RaisedButton
              secondary={true}
              onClick={this.handleCloseDialog}
              label={t("common.cancel")}
            />
            <cm.RaisedButton
              primary={true}
              style={{marginLeft: 15}}
              onClick={this.handleCreate}
              label={t("common.create")}
            />
          </div>
        </div>
      </cm.Dialog>
    );
  }
}
