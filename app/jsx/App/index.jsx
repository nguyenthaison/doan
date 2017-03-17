import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import HeaderMenu from "./Header"
import Drawer from "./Drawer";

export default class App extends BaseComponent {
  constructor(props) {
    super(props);
    global.App = this;
    this.auth = null;

    this.state = {
      drawerCollapsed: false,
    }
  }

  isAuthorized() {
    let authorizedPages = this.auth.authorized_pages;
    let pathWithoutNumberArgs = Helper.getCurrentPath().replace(/\/\d+/, "");
    let items = pathWithoutNumberArgs.split("/");

    for (let item of items) {
      if (item !== "") {
        if (!authorizedPages[item]) {
          return false;
        }
        authorizedPages = authorizedPages[item]
      }
    }
    return true;
  }

  checkAuthorized() {
    if (!this.isAuthorized()) {
      Helper.showErrors(t("common.message.no_authorization"));
      Helper.transitionTo("/");
    }
  }

  componentDidMount() {
    API.Authentication.getList(this.handleGetAuthenticationCallback);

    // Don't know whether it's react-router bug,
    // when you back to the first loaded route, you will get blank page.
    // This below line will do a trick, replace a POST (full page load) of the first time,
    // by a REPLACE. And it works like a charm.
    Helper.history.replace({
      pathname: Helper.getCurrentPath()});
  }

  handleGetAuthenticationCallback = (status, data) => {
    if (!status) return;
    this.auth = data
    this.checkAuthorized();
    this.forceUpdate();
  }

  updateSettings(data) {
    this.auth.settings = this.auth.settings.filter(setting => setting.key !== data.key);
    this.auth.settings.push(data);
    this.forceUpdate();
  }

  setToolBarOnHeaderMenu = (title = "", linkTo = null) => {
    this.refs.headerMenu.setToolBar(title, linkTo);
  }

  setTheme() {
    let primary1Color = "";
    let secondaryColor = "";
    let style = this.auth ? this.auth.field_style : "";
    let urlIconMenuFaq = "";

    switch(style) {
      case "blue":
        primary1Color = "#f9ad81";
        secondaryColor = "#247291";
        urlIconMenuFaq = "/images/faqicon-blue.png";
        break;
      case "green":
        primary1Color = "#1d6a63";
        secondaryColor = "#56bfb5";
        urlIconMenuFaq = "/images/faqicon-green.png";
        break;
      case "pink":
        primary1Color = "#89c3eb";
        secondaryColor = "#fc968a";
        urlIconMenuFaq = "/images/faqicon-witty.png";
        break;
      default:
        primary1Color = "#f49ac1";
        secondaryColor = "#b7d0e8";
    }

    global.theme = {
      secondaryColor: secondaryColor,
      primary1Color: primary1Color,
      urlIconMenuFaq: urlIconMenuFaq,
      defaultIconMenuFaq: "/images/faqicon.png",
    }

    return (
      getMuiTheme({
        fontFamily: "Mieryo, 'メイリオ', sans-serif",
        palette: {
          primary1Color: primary1Color,
          accent1Color: "#555555",
        },
      })
    )
  }

  handleToggleDrawer = () => {
    this.setState({
      drawerCollapsed: !this.state.drawerCollapsed,
    });
  }

  renderMainContent() {
    let mainClass = this.state.drawerCollapsed ? "main-area-w56" : "main-area-w195";
    return (
      <div className="main-layout">
        <Drawer
          collapsed={this.state.drawerCollapsed}
          onToggle={this.handleToggleDrawer}
          currentPath={Helper.getCurrentPath()}
          />
        <div className={mainClass}>
          <HeaderMenu ref="headerMenu" />
          <div className="main-content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }

  render() {
    let theme = this.setTheme();
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          {this.auth ? this.renderMainContent() : null}
        </div>
      </MuiThemeProvider>
    );
  }
}
