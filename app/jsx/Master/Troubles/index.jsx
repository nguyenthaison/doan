export default class Troubles extends PageComponent {
  constructor(props) {
    super(props);
  }

  renderButton = (name, transitionTo, icon) => {
    let authorizedPages = App.auth.authorized_pages;
    if (!authorizedPages.master.troubles[name]) return;

    return (
      <div className="master-item" onClick={() => Helper.transitionTo(transitionTo)}>
        <i className="material-icons" style={{color: theme.secondaryColor}}>{icon}</i>
        {t(`master.troubles.${name}`)}
      </div>
    )
  }

  render() {
    return (
      <div className="base-master-index">
        <BaseMaster.ListHeader
          icon={<i className="material-icons icon-header">warning</i>}
          title={t("master.troubles.title")}>
        </BaseMaster.ListHeader>
        <div className="list-master">
          {this.renderButton("name", "/master/troubles/name", "warning")}
          {this.renderButton("list", "/master/troubles/list", "warning")}
        </div>
      </div>
    )
  }
}
