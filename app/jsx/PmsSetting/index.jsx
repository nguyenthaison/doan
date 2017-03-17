export default class PmsSetting extends PageComponent {
  constructor(props) {
    super(props);
  }

  renderButton(name, transitionTo, icon) {
    return (
      <div className="master-item" onClick={() => Helper.transitionTo(transitionTo)}
        style={{borderTop: `7px solid ${theme.secondaryColor}`}}>
        <i className="material-icons" style={{color: theme.secondaryColor}}>{icon}</i>
        {t(`pms.index.${name}`)}
      </div>
    )
  }

  render() {
    return (
      <div className="list-master">
        {this.renderButton("users", "/pmsSetting/users", "account_circle")}
        {this.renderButton("company", "/pmsSetting/companies", "subject")}

      </div>
    )
  }
}
