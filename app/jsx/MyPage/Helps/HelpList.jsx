import Done from "material-ui/svg-icons/action/done";

const takeRecord = 5;

export default class HelpList extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleDoneHelp = (help) => {
    help = update(help, {is_checked: {$set: true}})
    this.props.onUpdate(help);
  }

  renderHelpItem(help) {
    let title = help.user.name + " " + t("my_page.help.title");
    let clientLineName = help.navigation.client.name + " > " + help.navigation.line.name;

    return (
      <div className="row-item help-item">
        <div className="pull-left item-main-content">
          <div className="datetime">
            <label>{t("my_page.help.time_notice")}{help.created_at}</label>
            <label className="ellipsis-text client-line-name" title={clientLineName}>
              <i className="material-icons" style={{color: theme.secondaryColor}}>perm_phone_msg</i>
              {clientLineName}
            </label>
          </div>
          <div className="faq-com-title">
            <div
              className="ellipsis-text"
              title={help.title}
              dangerouslySetInnerHTML={{__html: title.escape().replace(/ /gi, '&nbsp;')}}
            >
            </div>
          </div>
          <div className="datetime">
            {help.updater_id ? <label>{t("my_page.help.time_done")}{help.updated_at}</label> : ""}
          </div>
        </div>
        <div className="like-number pull-right">
          {this.props.showBtnDone ?
            <cm.RaisedButton
              icon={<Done />}
              className="btn-create"
              label={t("common.done")}
              onClick={() => this.handleDoneHelp(help)} /> : ""
          }
        </div>
      </div>
    );
  }

  renderHelpList() {
    let helps = this.props.helps;

    if (helps.length === 0)
      return <div className="no-record">{t("common.message.no_record")}</div>;

    return (
      <div className="faq-list-content">
        {helps.map(help =>
          <div className="table-row-striped item-row pointer"
            key={help.id}>
            {this.renderHelpItem(help)}
          </div>
        )}
      </div>
    );
  }

  render() {
    return this.renderHelpList();
  }
}
