import Forum from 'material-ui/svg-icons/communication/forum';
import Feeds from "./Feeds";
import Annoucement from "./Annoucement";
import NotificationList from "./NotificationList";
import FaqList from "./FaqList";

export default class Top extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      faqList: [],
      comList: [],
      notifications: [],
    };
  }

  componentDidMount() {
    this.setToolBar(t("top.title"));
    API.Faquestion.getList(this.handleGetFaquestionListCallback,
      {take: 5, methods: ["faq_user"]});

    API.Community.getList(this.handleGetCommunityListCallback, this.getComOptions());
    this.getNotificationList();
  }

  getComOptions() {
    let include = {
      faquestion: {
        only: ["id"],
      }
    };

    return {
      include: JSON.stringify(include),
      take: 5,
      methods: ["faq_user"],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.getNotificationList();
  }

  get locationState() {
    return Helper.getCurrentLocationState();
  }

  get filterNotificationBy() {
    let defaultFilterTeam = App.auth.team ? "my_team" : "other_team";
    return this.locationState.filterNotificationBy || defaultFilterTeam;
  }

  getNotificationList() {
    API.Notification.getList(this.handleGetNotificationListCallback, {
        in_top: true,
        order_by: "DATE(notifications.start_date) asc, priority desc",
        filter_team: this.filterNotificationBy,
      }
    );
  }

  reOrderList(list, type) {
    let _list = update(list, {});
    for (let key in list) {
      let item = list[key][type];
      if (item && item["user_id"] === App.auth.id) {
        let index = _list.findIndex(_value => _value["id"] === list[key]["id"]);
        _list.splice(index, 1);
        _list.push(list[key]);
      }
    }
    return _list;
  }

  handleGetNotificationListCallback = (status, data) => {
    if (!status) return;
    this.setState({
      notifications: data.notifications,
    });
  }

  handleFilterNotification = (filter) => {
    let locationState = update(this.locationState, {["filterNotificationBy"]: {$set: filter}});

    Helper.history.replace({
      pathname: Helper.getCurrentPath(),
      query: {},
      state: locationState,
    });
  }

  handleGetFaquestionListCallback = (status, data) => {
    if (!status) return;

    this.setState({
      faqList: data.faquestions,
    })
  }

  handleGetCommunityListCallback = (status, data) => {
    if (!status) return;

    this.setState({
      comList: data.communities,
    })
  }

  render() {
    let faqList = this.reOrderList(this.state.faqList, "faq_user");
    let comList = this.reOrderList(this.state.comList, "faq_user");
    let noticeList = this.reOrderList(this.state.notifications, "notice_user");

    return (
      <div className="top-page col-md-12">
        <div className="col-md-9 faq-com-list">
          <Annoucement />
          <NotificationList
            notifications={noticeList}
            filterBy={this.filterNotificationBy}
            onChange={this.handleFilterNotification}/>
          <div className="faq-container" style={{padding: "0px"}} >
            <div className="title-list-faq-com">
              <i className="material-icons" style={{float: "left", marginRight: "10px"}}>chat_bubble</i>
              <span>{t("top.header_list_faq")}</span>
            </div>
            <div className="faq-list" style={{padding: "0px"}}>
              <FaqList
                list={faqList}
                type="faq"
                basePath="/faqs/"/>
            </div>
          </div>
          <div className="faq-container" style={{padding: "0px"}}>
            <div className="title-list-faq-com">
              <i className="material-icons" style={{float: "left", marginRight: "10px"}}>forum</i>
              <span>{t("top.header_list_com")}</span>
            </div>
            <div className="faq-list" style={{padding: "0px"}}>
              <FaqList
                list={comList}
                type="community"
                basePath="/communities/"/>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <Feeds />
        </div>
      </div>
    )
  }
}
