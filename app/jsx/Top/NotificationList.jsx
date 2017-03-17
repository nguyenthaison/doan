export default class NotificationList extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleClickFilter = (filter) => {
    this.props.onChange(filter);
  }

  checkNotificationIsReaded(notification) {
    return notification.readed;
  }

  checkNotificationIsNew(notification) {
    return !this.checkNotificationIsReaded(notification) && notification.status_in_top.new;
  }

  checkNotificationIsWarning(notification) {
    return !this.checkNotificationIsReaded(notification) && notification.status_in_top.warning;
  }

  checkIsMyTeamScreen() {
    return this.props.filterBy === "my_team";
  }

  renderStatusImage(notification) {
    let imageLink = null;

    if (this.checkNotificationIsNew(notification)) {
       imageLink = "/images/new.png";
    } else if (this.checkNotificationIsWarning(notification)) {
      imageLink = "/images/warning.png";
    }

    return (
      <div className="status-image">
        <img src={imageLink}></img>
      </div>
    )
  }

  renderNotificationItem(notification) {
    let splitedContent = notification.content.split('\n');
    return (
      <div className="row-item">
        {this.checkIsMyTeamScreen() ? this.renderStatusImage(notification) : null}
        <div className="content">
          <div className="faq-com-title">
            <label className={notification.priority + " priority-label col-md-2"}>
              <span>{t("notifications.attributes.priority")}:</span>
              {t(`notifications.priorities.${notification.priority}`)}
            </label>
            <div
              className="ellipsis-text"
              title={notification.title}
              dangerouslySetInnerHTML={{__html: notification.title.escape().replace(/ /gi, '&nbsp;')}}
            >
            </div>
            {notification.has_note ?
              <div className="has-note pull-right">
                <i className="material-icons">library_books</i>
                {t("notifications.index.has_note")}
              </div>
              : null}
          </div>
          <div
            className="question ellipsis-text"
            title={notification.content}
            dangerouslySetInnerHTML={{
              __html: "[" + notification.start_date + "~" + notification.end_date + "]"
                + splitedContent[0].trim().escape().replace(/ /gi, '&nbsp;')
                + (splitedContent.length > 1 ? "..." : "")
            }}
          >
          </div>
        </div>
      </div>
    );
  }

  renderFilterBar() {
    let filter = ["other_team"];
    if (App.auth.team) filter.unshift("my_team");

    return (
      <div className="row-item filter-header">
        {
          filter.map((item, index) => {
            let selected = item === this.props.filterBy ? "selected-filter" : "";
            return (
              <span
                key={index}
                onClick={() => this.handleClickFilter(item)}
                style={selected ? {backgroundColor: theme.secondaryColor} : null}
                className={`filter-tab pointer ${selected}`}>
                {t(`top.notification.filter.${item}`)}
              </span>
            );
          })
        }
      </div>
    )
  }

  renderNotificationList() {
    let notifications = this.props.notifications;

    if (notifications.length === 0)
      return <div className="no-record">{t("common.message.no_record")}</div>;

    return notifications.map(notification =>
      <div
        key={notification.id}
        className={(this.checkIsMyTeamScreen() && this.checkNotificationIsReaded(notification) ? "readed " : "") + "item-row pointer"}
        onClick={() => Helper.transitionTo("/notifications/" + notification.id)}>
        {this.renderNotificationItem(notification)}
      </div>
    );
  }

  render() {
    return (
      <div className="faq-list notification-list">
        <div className="title-list-faq-com">
          <i className="material-icons">content_paste</i>
          <span>{t("notifications.title")}</span>
          <div className="pull-right go-to-notification">
            <i className="material-icons">play_circle_outline</i>
            <span
              onClick={() => Helper.transitionTo("/notifications")}
              className="go-to-notification-list pointer">
              {t("top.notification.view_all")}
            </span>
          </div>
        </div>
        <div className="list-content">
          {this.renderFilterBar()}
          <div className="awesome-scroll list-notice">
            {this.renderNotificationList()}
          </div>
        </div>
      </div>
    );
  }
}
