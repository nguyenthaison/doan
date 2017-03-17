export default class Drawer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      noticeNumber: App.auth.notice_helps_size,
      field_id: App.auth.field_id,
    }
  }

  componentDidMount() {
    RailsApp.cable.subscriptions.create("HelpChannel", {
      received: (data) => {
        let help = JSON.parse(data.help);
        this.setState({
          noticeNumber: data.notice,
          field_id: help.field_id
        });
      }
    });
  }

  handleTouchMenu = (e, menuItem) => {
    Helper.transitionTo(menuItem.props.value);
  }

  renderNoticeNumber(noticeNumber, field_id) {
    let isActive;
    if (this.props.currentPath === "/") {
      isActive = "myPage" === Object.keys(App.auth.authorized_pages)[0]
    } else {
      isActive = this.props.currentPath.split("/")[1] === "myPage"
    }

    let backgroundColor = isActive ? "white" : "#fa3e3e";
    let textColor = isActive ? "black" : "white";
    if (!noticeNumber || field_id !== App.auth.field_id) return;

    return (
      <div className="notification">
        <mui.Badge
          badgeContent={noticeNumber}
          badgeStyle={{top: 0, right: 12, backgroundColor: backgroundColor,
            color: textColor, fontWeight: "bold"}}
        />
      </div>
    )
  }

  renderMenuItem(item, transitionTo, icon, isCustomIcon, rightIcon) {
    let isActive;
    if (this.props.currentPath === "/") {
      isActive = item === Object.keys(App.auth.authorized_pages)[0]
    } else {
      isActive = this.props.currentPath.split("/")[1] === item
    }

    let menuItemIcon = isCustomIcon ?
      <i className={icon + (isActive ? "-active" : "")}>
        <img src={isActive ? theme.urlIconMenuFaq : theme.defaultIconMenuFaq} />
      </i> :
      <i className="material-icons">{icon}</i>;

    if (!App.auth.authorized_pages[item]) return null;

    let innerDivStyle = {
      background: isActive ? theme.secondaryColor : null,
      paddingLeft: this.props.collapsed ? "100px" : "50px",
    };

    return (
      <mui.MenuItem
        title={t(`app.drawer.${item}`)}
        className={"drawer-item " + (isActive ? "active-item" : "normal-item")}
        innerDivStyle={innerDivStyle}
        primaryText={t(`app.drawer.${item}`)}
        leftIcon={menuItemIcon}
        rightIcon={rightIcon}
        value={transitionTo} />
    );
  }

  render() {
    let drawerClass = this.props.collapsed ? "drawer-close" : "drawer-open";
    let width = this.props.collapsed ? 56 : 195;
    let noticeNumber = this.state.noticeNumber;
    let field_id = this.state.field_id;
    let auth = App.auth;
    let defaultBigLogoPath = "/images/witty.png";
    let defaultSmallLogoPath = "/images/logo-small-witty.png";
    let bigLogo = auth && auth.field_logo ? auth.field_logo.thumb_url :
      defaultBigLogoPath;
    let smallLogo = auth && auth.small_field_logo ? auth.small_field_logo.thumb_url :
      defaultSmallLogoPath;
    let logo = this.props.collapsed ? smallLogo : bigLogo;

    return (
      <mui.Drawer open={true} width={width} className="app-drawer">
        <div className={drawerClass}>
          <div className="logo-wrapper pointer">
            <div className="logo" onClick={() => Helper.transitionTo("/")}>
              <img src={logo} width={width} />
            </div>
          </div>
          <mui.Menu onItemTouchTap={this.handleTouchMenu} className="default-cursor">
            {this.renderMenuItem("top", "/", "home")}
            {this.renderMenuItem("navigations", "/navigations", "navigation")}
            {this.renderMenuItem("notifications", "/notifications", "info")}
            {this.renderMenuItem("faqs", "/faqs", "faq-icon", true)}
            {this.renderMenuItem("communities", "/communities", "forum")}
            {this.renderMenuItem("manual_files", `/manual_files/${auth.root_folder_id}`, "insert_drive_file")}
            {this.renderMenuItem("bookmarks", `/bookmarks/${auth.root_bookmark_id}`, "bookmark")}
            {this.renderMenuItem("master", "/master", "work")}
            {this.renderMenuItem("company", "/company", "business")}
            {this.renderMenuItem("pmsSetting", "/pmsSetting", "settings")}
            {this.renderMenuItem("masterNavigation", "/masterNavigation", "send")}
            {this.renderMenuItem("myPage", "/myPage", "account_circle", false, this.renderNoticeNumber(noticeNumber, field_id))}
          </mui.Menu>
          <div className="drawer-toggle" onClick={this.props.onToggle}></div>
        </div>
      </mui.Drawer>
    );
  }
}
