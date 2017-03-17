export default class CompanyIndex extends PageComponent {
  constructor(props) {
    super(props);
  }

  renderButton = (name, transitionTo, icon) => {
    let authorizedPages = App.auth.authorized_pages;
    if (authorizedPages.company && !authorizedPages.company[name]) return;

    return (
      <div className="master-item"
        onClick={() => Helper.transitionTo(transitionTo)}
        style={{borderTop: `7px solid ${theme.secondaryColor}`}}>
        <i className="material-icons" style={{color: theme.secondaryColor}}>{icon}</i>
        {t(`company.index.${name}`)}
      </div>
    )
  }

  render() {
    return (
      <div className="list-master">
        {this.renderButton("organizations", "/company/organizations", "location_city")}
        {this.renderButton("positions", "/company/positions", "person_pin")}
        {this.renderButton("users", "/company/users", "account_circle")}
        {this.renderButton("fields", "/company/fields", "share")}
      </div>
    )
  }
}
