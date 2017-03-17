import NotificationItem from "./NotificationItem";
import SearchForm from "./SearchForm";

const takeRecord = 20;

export default class Notifications extends PageComponent {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      hasMore: false,
    }

    this.take = takeRecord;
  }

  get locationState() {
    return Helper.getCurrentLocationState();
  }

  get orderBy() {
    return this.locationState.orderBy || "created_at";
  }

  componentDidMount() {
    this.setToolBar(t("notifications.title"), "/notifications/new");
    this.getNotificationList();
  }

  getNotificationList() {
    let include = {"creator": {"only": ["name"]}, "teams": {"only": ["name"]}};
    let searchInfo = this.locationState.searchInfo || {};
    let orderBy = (this.locationState.orderBy || "created_at") + " desc, created_at desc";
    let searchParams = {};


    if (searchInfo) {
      let lines = searchInfo.lines || [];
      let tags = searchInfo.tags || [];
      let teams = searchInfo.teams || [];
      let timeRange = searchInfo.timeRange || {};

      searchParams = {
        query: searchInfo.query,
        lines: lines.map(clientLine => clientLine.line && clientLine.line.id),
        clients: lines.map(clientLine => !clientLine.line && clientLine.client.id),
        child_tags: tags.map(faqTag => faqTag.tag && faqTag.tag.id),
        parent_tags: tags.map(faqTag => !faqTag.tag && faqTag.parent_tag.id),
        teams: teams.map(team => team.id),
        time_range: timeRange,
      }
    }

    API.Notification.getList(this.handleGetNotificationListCallback, {
      search_query: searchParams,
      order_by: orderBy,
      take: this.take,
      include: include,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.getNotificationList();
  }

  handleSubmitSearch = () => {
    this.take = takeRecord;
    let state = update(this.locationState, {searchInfo:
      {$set: this.refs.searchForm.getSearchInfo()}
    });

    Helper.history.replace({
      pathname: Helper.getCurrentPath(),
      query: {},
      state: state,
    });
  }

  handleGetNotificationListCallback = (status, data) => {
    if (!status) return;
    this.setState({
      notifications: data.notifications,
      countSearch: data.count,
      hasMore: data.has_more,
    });
  }

  handleClickOrder = (order) => {
    let locationState = update(this.locationState, {["orderBy"]: {$set: order}});
    Helper.history.replace({
      pathname: Helper.getCurrentPath(),
      query: {},
      state: locationState,
    });
  }

  handleClickLoadMore = () => {
    this.take += takeRecord;
    this.getNotificationList();
  }

  renderNotificationList() {
    let notifications = this.state.notifications;
    if (notifications.length === 0)
      return <div className="no-record">{t("common.message.no_record")}</div>;
    return notifications.map((notification) => {
      return(
        <NotificationItem
          key={notification.id}
          notification={notification}
          backgroundClassName={"table-row-striped"}
        />
      );
    });
  }

  renderOrderList() {
    let orders = ["created_at", "priority"];
    let report = "";
    if (this.locationState.searchInfo == null) {
      report = t("notifications.index.notification_list");
    } else {
      report = t("notifications.index.search_results", {count: this.state.countSearch || 0});
    }

    let orderBy = this.orderBy;

    let orderList = (
      <div className="order-list pull-right">
        {
          orders.map((order, index) => {
            let selected = orderBy === order ? "selected-filter" : "";
            return (
              <span
                onClick={() => this.handleClickOrder(order)}
                className={`pointer ${selected}`}
                style={selected ? {backgroundColor: theme.secondaryColor} : null}
                key={index}>
                {t(`notifications.index.order.${order}`)}
              </span>
            )
          })
        }
      </div>
    );

    return (
      <div className="row">
        {this.state.notifications.length !== 0 ? orderList : ""}
        <div className="pull-left">
          <span className="report-results">
            {report}
          </span>
        </div>
      </div>
    )
  }

  render() {
    let searchInfo = this.locationState.searchInfo;
    return (
      <div className="row faq-container notification-container">
        <div className="search-container">
          <SearchForm
            searchInfo={searchInfo}
            ref="searchForm"
            onSubmitSearch={this.handleSubmitSearch}
          />
        </div>
        <div className="col-md-12">
          <div className="sort-faqs">
            {this.renderOrderList()}
          </div>
          <div className="faq-list notification-list">
            {this.renderNotificationList()}
            {this.state.hasMore ?
              <div className="btn-show-more">
                <cm.RaisedButton
                  label={t("common.show_more")}
                  onTouchTap={this.handleClickLoadMore}
                  backgroundColor="lightgray"
                  style={{
                    width: "100%",
                    marginTop: "15px",
                  }}
                  labelStyle={{
                    fontWeight: "bold",
                  }}
                />
              </div> : null}
          </div>
        </div>
      </div>
    )
  }
}
