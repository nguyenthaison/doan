export default class MasterIndex extends PageComponent {
  constructor(props) {
    super(props);
  }

  renderButton = (name, transitionTo, icon) => {
    let authorizedPages = App.auth.authorized_pages;
    if (authorizedPages.master && !authorizedPages.master[name]) return;

    return (
      <div className="master-item"
        onClick={() => Helper.transitionTo(transitionTo)}
        style={{borderTop: `7px solid ${theme.secondaryColor}`}}
      >
        <i className="material-icons" style={{color: theme.secondaryColor}}>{icon}</i>
        {t(`master.index.${name}`)}
      </div>
    )
  }

  render() {
    return (
      <div className="list-master">
        {this.renderButton("clients", "/master/clients", "supervisor_account")}
        {this.renderButton("troubles", "/master/troubles", "warning")}
        {this.renderButton("tags", "/master/tags", "local_offer")}
        {this.renderButton("notificationAddresses", "/master/notificationAddresses", "notifications_active")}
      </div>
    )
  }
}
