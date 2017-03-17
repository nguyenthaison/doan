import SwipeableViews from "react-swipeable-views";
import Launch from "material-ui/svg-icons/action/launch";
import Divider from "material-ui/Divider";
import SearchForm from "./SearchForm";

const pluralize = require("pluralize");
const takeRecord = 20;
const styles = {
  inkBar: {backgroundColor: "#4bacf5", height: "4px", marginTop: "0px"},
  loadMore: {width: "100%", marginTop: "15px"},
  loadMoreLabel: {width: "100%", marginTop: "15px", color: "white"}
}

const tabIndexes = {
  faquestion: 0,
  community: 1,
  notification: 2,
}
const numberTroubleType = 4;

export default class SearchDrawer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: tabIndexes.faquestion,
      selectedTroubles: [],
    };
    this.objectTypes = ["Faquestion", "Community", "Notification"];
    this.takeFaquestion = takeRecord;
    this.takeCommunity = takeRecord;
    this.takeNotification = takeRecord;
  }

  handleChangeTab = (index) => {
    this.setState({
      tabIndex: index,
    });
  };

  open = () => {
    this.refs.drawer.open();

    if (App.navigation && App.selectedNode) {
      API.Trouble.getList(this.handleGetTroubleCallback, {
        only: ["id", "name", "parent_id"],
        order_by: "created_at asc",
      });
    }
  }

  setSelectedNodes() {
    let selectedNode = App.selectedNode;

    this.selectedNodes = [];
    let todos = App.navigation.todos;
    let todo = {};
    let nodeId = selectedNode.id;

    while (todo) {
      todo = todos.find(todo => todo.nodes.find((node) => {
        if (node.id === nodeId) {
          this.selectedNodes.unshift(node);
          return true;
        }
      }));
      if (todo) nodeId = todo.node_id;
    }
  }

  setSelectedTroubles() {
    let parentTroubleId = 0;
    let selectedTroubles = [];

    for (let i = 0; i < numberTroubleType; i++) {
      let node = this.selectedNodes.shift();
      if (!node) break;

      let trouble = this.troubles.find(trouble => trouble.name === node.name &&
        trouble.parent_id === parentTroubleId);
      if (trouble) {
        selectedTroubles.push(trouble);
        parentTroubleId = trouble.id;
      }
    }
    this.setState({
      selectedTroubles: selectedTroubles,
    });
  }

  handleGetTroubleCallback = (status, data) => {
    if (!status) return;
    this.troubles = data.troubles;

    this.setSelectedNodes();
    this.setSelectedTroubles();
  }

  handleSubmitSearch = (searchInfo) => {
    let orderBy = "created_at desc";
    let searchParams = {};

    if (searchInfo) {
      searchParams = {
        query: searchInfo.query,
        troubles: searchInfo.troubles.map(trouble => trouble.id),
      }
    }

    this.objectTypes.map((type) => {
      API[type].getList((status, data) => this.handleSearchCallback(type, status, data), {
        search_query: searchParams,
        order_by: orderBy,
        count: true,
        take: this[`take${type}`],
      });
    });
  }

  handleSearchCallback = (type, status, data) => {
    if (!status) return;
    let pluralType = pluralize.plural(type);
    let lowercaseType = pluralType.toLowerCase();
    this.setState({
      [lowercaseType]: data[lowercaseType],
      [`hasMore${type}`]: data.has_more,
    });
  }

  handleClickDetail = (link) => {
    Helper.transitionTo(link);
    this.refs.drawer.close();
  }

  handleClickLoadMore = (type) => {
    this[`take${type}`] += takeRecord;
    this.handleSubmitSearch();
  }

  handleClickExpand = () => {
    let searchInfo = this.refs.searchForm.getSearchInfo();
    let linkTo = "";
    switch(this.state.tabIndex) {
      case tabIndexes.faquestion:
        linkTo = "/faqs";
        break;
      case tabIndexes.community:
        linkTo = "/communities";
        break;
      case tabIndexes.notification:
        linkTo = "/notifications";
    }

    this.refs.drawer.close();
    Helper.transitionTo(linkTo, {searchInfo: searchInfo, orderBy: "created_at"});
  }

  renderTabs() {
    let swipeableViewsClass = this.state.tabIndex === tabIndexes["notification"] ?
      "tab-notification-content" : "tab-faq-content";

    return (
      <div className="slider-tabs">
        <mui.Tabs className="tabs"
          value={this.state.tabIndex}
          onChange={this.handleChangeTab}
          inkBarStyle={styles.inkBar}
        >
          <mui.Tab label={t("app.search_drawer.faq")} value={tabIndexes.faquestion} />
          <mui.Tab label={t("app.search_drawer.community")} value={tabIndexes.community} />
          <mui.Tab label={t("app.search_drawer.notification")} value={tabIndexes.notification} />
        </mui.Tabs>

        <SwipeableViews
          index={this.state.tabIndex}
          onChangeIndex={this.handleChangeTab}
          className={`awesome-scroll ${swipeableViewsClass}`}
        >
          <div>{this.renderResultItems(this.state.faquestions, "Faquestion")}</div>
          <div>{this.renderResultItems(this.state.communities, "Community")}</div>
          <div>{this.renderResultItems(this.state.notifications, "Notification")}</div>
        </SwipeableViews>
      </div>
    );
  }

  renderResultItems(items, type) {
    if (!items) return null;
    let baseLink = pluralize.plural(type.toLowerCase());
    if (type === "Faquestion") baseLink = "faqs";

    if (items && items.length === 0) {
      return <div className="no-record">{t("common.message.no_record")}</div>;
    }

    let renderedItems = items.map((item) => {
      let linkToDetail = `/${baseLink}/${item.id}`

      return (
        <div className="item" key={item.id}>
          <p className="title ellipsis-text pointer"
            onClick={() => this.handleClickDetail(linkToDetail)}>{item.title}</p>
          <p className="question">{type === "Notification" ? item.content : item.question}</p>
          <Divider />
        </div>
      );
    });
    let hasMoreName = `hasMore${type}`;

    return (
      <div>
        {renderedItems}
        {this.state[hasMoreName] ?
          <div className="btn-show-more">
            <cm.RaisedButton
              label={t("common.show_more")}
              onTouchTap={() => this.handleClickLoadMore(type)}
              backgroundColor="#3b3d43"
              style={styles.loadMore}
              labelStyle={styles.loadMoreLabel}
            />
          </div> : null}
      </div>
    );
  }

  render() {
    return (
      <cm.Drawer
        ref="drawer"
        width={350}
        className="search-drawer"
      >
        <mui.AppBar className="app-bar"
          title={t("app.search_drawer.title")}
          iconElementLeft={<mui.IconButton><i className="material-icons">search</i></mui.IconButton>}
          iconElementRight={<mui.FlatButton
            label={t("app.search_drawer.show_more")}
            labelPosition="before"
            icon={<Launch />}
            onClick={this.handleClickExpand}
          />}
        />
        <SearchForm
          ref="searchForm"
          onSubmitSearch={this.handleSubmitSearch}
          tabIndex={this.state.tabIndex}
          tabIndexes={tabIndexes}
          selectedTroubles={this.state.selectedTroubles}
        />
        {this.renderTabs()}
      </cm.Drawer>
    );
  }
}
