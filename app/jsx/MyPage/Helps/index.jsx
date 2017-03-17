import HelpsDialog from "./HelpsDialog";
import HelpList from "./HelpList";

export default class Index extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      helps: [],
    };

    this._help = null;
  }

  componentDidMount() {
    this.getHelpList();
    this._isMounted = true;
    RailsApp.cable.subscriptions.create("HelpChannel", {
      received: (data) => {
        let help = JSON.parse(data.help);
        let helps = update(this.state.helps, {$push: [help]});
        if (this._isMounted) {
          this.getHelpList();
          this.setState({
            helps: helps,
          })
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getHelpList() {
    API.Help.getList(this.handleGetListCallback, this.getOptions());
  }

  handleUpdate = (data) => {
    this.setState({
      helps: data,
    })
  }

  getOptions() {
    let include = {
      navigation: {
        include: {
          client: {only: ["name"]},
          line: {only: ["name"]},
        },
      },
      user: {
        only: ["name"],
        include: {team: {only: ["id"]}},
      },
    };

    return {
      filter: {field_id: App.auth.field_id},
      include: JSON.stringify(include),
    }
  }

  handleGetListCallback = (status, data) => {
    if (!status) return;

    this.setState({
      helps: data.helps,
    });
  }

  handleDoneHelp = (help) => {
    this._help = help;
    this.setState({
      helps: this.state.helps,
    });

    API.Help.update(this.handleUpdateCallback, help);
  }

  handleUpdateCallback = (status, data) => {
    if (!status) return this.getHelpList();
    Helper.showMessage(t("common.message.updated_success"));
  }

  renderDialogs() {
    let historyList = this.state.helps.filter(help => help.is_checked &&
      help.updater_id == App.auth.id);

    return (
      <div>
        <HelpsDialog
          helps={historyList}
          ref="help"
          title={t("my_page.help_history")}
          type="Help"
        />
      </div>
    );
  }

  renderHelpList() {
    let team_ids = App.auth.notice_team_ids;
    let helps = this.state.helps.filter(help => {
      if (this._help !== null && help.id === this._help.id) return false;
      if (App.auth.role === "admin") return !help.is_checked;
      if (!help.is_checked) {
        return !help.user.team || team_ids.includes(help.user.team.id)
      }
    });

    return (
      <div className="faq-list">
        <div className="list-content">
          <div className="awesome-scroll list-notice">
            <HelpList
              showBtnDone={true}
              helps={helps}
              onUpdate={this.handleDoneHelp}
            />
          </div>
        </div>
      </div>
    );
  }

  renderTitle(icon, type) {
    return (
      <div className="title-list-faq-com">
        <i className="material-icons">{icon}</i>
        <span>{t(`my_page.${type.toLowerCase()}_history`)}</span>
        <div className="pull-right go-to-history">
          <i className="material-icons">play_circle_outline</i>
          <span
            onClick={() => this.refs[type.toLowerCase()].open()}
            className="go-to-history-list pointer">
            {t("my_page.go_to_history_list")}
          </span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="faq-list">
        {this.renderTitle("notifications_active", "Help")}
        {this.renderHelpList()}
        {this.renderDialogs()}
      </div>
    )
  }
}
