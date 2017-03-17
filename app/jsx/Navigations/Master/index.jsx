export default class MasterNavigation extends PageComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setToolBar(t("navigations.header_title"));
  }

  renderButton = (name, transitionTo, icon) => {
    let authorizedPages = App.auth.authorized_pages;
    if (authorizedPages.masterNavigation && !authorizedPages.masterNavigation[name]) return;

    return (
      <div className="master-item"
        onClick={() => Helper.transitionTo(transitionTo)}
        style={{borderTop: `7px solid ${theme.secondaryColor}`}}>
        <i className="material-icons" style={{color: theme.secondaryColor}}>{icon}</i>
        {t(`navigations.master.${name}`)}
      </div>
    );
  }

  render() {
    return (
      <div className="list-master">
        {this.renderButton("navigations", "/masterNavigation/navigations", "navigation")}
        {this.renderButton("stepConfig", "/masterNavigation/stepConfig", "view_list")}
        {this.renderButton("flows", "/masterNavigation/flows", "donut_large")}
        {this.renderButton("claims", "/masterNavigation/claims", "sentiment_very_dissatisfied")}
      </div>
    );
  }
}
