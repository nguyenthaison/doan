import Divider from "material-ui/Divider";
import SwipeableViews from "react-swipeable-views";
import Launch from "material-ui/svg-icons/action/launch";

const pluralize = require("pluralize");
const takeRecord = 20;
const tabIndexes = {
  faquestion: 0,
  community: 1,
};

const styles = {
  loadMore: {width: "100%", marginTop: "15px"},
  loadMoreLabel: {width: "100%", marginTop: "15px", color: "white"},
  inkBar: {backgroundColor: "#4bacf5", height: "4px", marginTop: "0px"},
}

export default class FavoriteDrawer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      openDrawer: false,
      tabIndex: 0,
      faquestions: [],
      communities: [],
    };
    this.objectTypes = ["Faquestion", "Community"];

    this.takeFaquestion = takeRecord;
    this.takeCommunity = takeRecord;
  }

  open = () => {
    this.objectTypes.map((type) => {
      let options = {
        filter: {favorited: App.auth.id},
        take: this[`take${type}`],
        order_by: `${type.toLowerCase()}_users.favorited_at desc`,
      };

      API[type].getList((status, data) => this.handleGetFaqList(type, status, data), options)
    });

    this.refs.drawer.open();
  }

  handleGetFaqList = (type, status, data) => {
    if (!status) return;
    let pluralType = pluralize.plural(type);
    let lowercaseType = pluralType.toLowerCase();

    this.setState({
      [lowercaseType]: data[lowercaseType],
      [`hasMore${type}`]: data.has_more,
    });
  }

  handleChangeTab = (value) => {
    this.setState({
      tabIndex: value,
    });
  }

  handleClickExpand = () => {
    let linkTo = "";
    let orderBy = "";

    switch(this.state.tabIndex) {
      case tabIndexes.faquestion:
        linkTo = "/faqs";
        orderBy = "faquestion_users.favorited_at";
        break;
      case tabIndexes.community:
        linkTo = "/communities";
        orderBy = "community_users.favorited_at";
        break;
    }

    this.refs.drawer.close();
    Helper.transitionTo(linkTo, {checkFavorite: true, orderBy: orderBy});
  }

  handleClickLoadMore = (type) => {
    this[`take${type}`] += takeRecord;
    API[type].getList((status, data) => this.handleGetFaqList(type, status, data), {
      filter: {favorited: App.auth.id},
      take: this[`take${type}`],
    });
  }

  handleClickDetail = (link) => {
    Helper.transitionTo(link);
    this.refs.drawer.close();
  }

  renderTabs() {
    let tabIndex = this.state.tabIndex;
    return (
      <div>
        <mui.Tabs className="tabs"
          onChange={this.handleChangeTab}
          value={tabIndex}
          inkBarStyle={styles.inkBar}
        >
          <mui.Tab label={t("app.favorite_drawer.faq")} value={0} />
          <mui.Tab label={t("app.favorite_drawer.community")} value={1} />
        </mui.Tabs>
        <SwipeableViews
          index={tabIndex}
          onChangeIndex={this.handleChangeTab}
          className="awesome-scroll tab-content"
        >
          <div>{this.renderFaqItems(this.state.faquestions, "Faquestion")}</div>
          <div>{this.renderFaqItems(this.state.communities, "Community")}</div>
        </SwipeableViews>
      </div>
    );
  }

  renderFaqItems(faqs, type) {
    let baseLink = pluralize.plural(type.toLowerCase());
    if (type === "Faquestion") baseLink = "faqs";

    let renderedFaqs = faqs.map((faq) => {
      let linkToDetail = `/${baseLink}/${faq.id}`

      return (
        <div className="faquestion-item" key={faq.id}>
          <p className="title ellipsis-text pointer"
            onClick={() => this.handleClickDetail(linkToDetail)}>{faq.title}</p>
          <p className="question">{faq.question}</p>
          <Divider />
        </div>
      );
    });
    let hasMoreName = `hasMore${type}`;

    return (
      <div>
        {renderedFaqs}
        {this.state[hasMoreName] ?
          <div className="btn-show-more">
            <cm.RaisedButton
              label={t("common.show_more")}
              onTouchTap={() => this.handleClickLoadMore(type)}
              backgroundColor="#3b3d43"
              style={styles.loadMore}
              labelStyle={styles.loadMoreLabel}
            />
          </div> : null
        }
      </div>
    );
  }

  render() {
    return (
      <cm.Drawer
        ref="drawer"
        width={350}
        className="favorite-drawer"
      >
        <mui.AppBar
          className="app-bar"
          title={t("app.favorite_drawer.favorite")}
          iconElementLeft={<mui.IconButton><i className="material-icons">favorite_border
            </i></mui.IconButton>}
          iconElementRight={<mui.FlatButton
            label={t("app.favorite_drawer.show_more")}
            labelPosition="before"
            onClick={this.handleClickExpand}
            icon={<Launch />}
          />}
        />
        {this.renderTabs()}
      </cm.Drawer>
    );
  }
}
