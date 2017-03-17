import {Link} from 'react-router';
import SearchForm from "./SearchForm";
import FaquestionItem from "./FaquestionItem";

const takeRecord = 20;

export default class FaquestionsList extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      faquestions: [],
      hasMore: false,
    }
    this.take = takeRecord;
    this.apiName = this.getApiName();
    this.path = this.getPathName();
  }

  get locationState() {
    return this.props.locationState || {};
  }

  get orderBy() {
    return this.locationState.orderBy || "created_at";
  }

  componentDidMount() {
    this.getFaquestionList(this.locationState);
  }

  componentWillReceiveProps(nextProps) {
    let locationState = nextProps.locationState || {};
    this.getFaquestionList(locationState);
  }

  getFaquestionList(locationState) {
    let searchInfo = locationState.searchInfo || null;
    let defaultSortBy = this.locationState.checkFavorite ?
      `${this.getApiName().toLowerCase()}_users.favorited_at` : "created_at"
    let orderBy = (locationState.orderBy || defaultSortBy) + " desc, created_at desc";
    let searchParams = {};

    if (searchInfo) {
      let lines = searchInfo.lines || [];
      let troubles = searchInfo.troubles || [];
      let tags = searchInfo.tags || [];
      searchParams = {
        query: searchInfo.query,
        lines: lines.map(clientLine => clientLine.line && clientLine.line.id),
        clients: lines.map(clientLine => !clientLine.line && clientLine.client.id),
        troubles: troubles.map(trouble => trouble.id),
        child_tags: tags.map(faqTag => faqTag.tag && faqTag.tag.id),
        parent_tags: tags.map(faqTag => !faqTag.tag && faqTag.parent_tag.id),
      }
    }
    let include = this.props.type === "community" ? {faquestion: {only: ["id"]}} : {};
    let options = {
      search_query: searchParams,
      order_by: orderBy,
      take: this.take,
      methods: ["authorized", "faq_user"],
      count: true,
      include: JSON.stringify(include),
    };
    if (locationState.checkFavorite) options["filter"] = {favorited: App.auth.id};

    API[this.apiName].getList(this.handleSearchFaquestionCallback, options);
  }

  getPathName() {
    let path = "";
    switch (this.props.type) {
      case "faq":
        path = "/faqs/";
        break;
      case "community":
        path = "/communities/";
        break;
    }
    return path;
  }

  getApiName() {
    let apiName = "";
    switch (this.props.type) {
      case "faq":
        apiName = "Faquestion";
        break;
      case "community":
        apiName = "Community";
        break;
    }
    return apiName;
  }

  handleUpdateReaction = (reaction) => {
    let faquestions = this.state.faquestions;
    let index = faquestions.findIndex((faq) => faq.id === reaction.id);
    faquestions[index] = update(faquestions[index], {$merge: reaction});
    this.setState({
      faquestions: faquestions,
    });
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

  handleSearchFaquestionCallback = (status, data) => {
    if (!status) return;
    this.setState({
      faquestions: data[this.props.listName],
      countSearch: data.count,
      hasMore: data.has_more,
    });
  }

  handleClickOrder = (order) => {
    let locationState = update(this.locationState, {orderBy: {$set: order}});
    Helper.history.replace({
      pathname: Helper.getCurrentPath(),
      query: {},
      state: locationState,
    });
  }

  handleClickLoadMore = () => {
    this.take += takeRecord;
    this.getFaquestionList(this.locationState);
  }

  handleClickFavoriteCheckbox = () => {
    let defaultSortBy = this.locationState.checkFavorite ? "created_at" :
      `${this.getApiName().toLowerCase()}_users.favorited_at`
    let locationState = update(this.locationState, {checkFavorite:
      {$set: !this.locationState.checkFavorite}, orderBy: {$set: defaultSortBy}});

    Helper.history.replace({
      pathname: Helper.getCurrentPath(),
      query: {},
      state: locationState,
    });
  }

  renderFaquestionList = () => {
    let faquestions = this.state.faquestions;
    if (faquestions.length === 0 && this.locationState.searchInfo == null)
      return <div className="no-record">{t("common.message.no_record")}</div>;

    return faquestions.map((faquestion, index) => {
      return(
        <FaquestionItem
          apiName={this.apiName}
          linkToDetail={this.path + faquestion.id}
          key={faquestion.id}
          faquestion={faquestion}
          onUpdated={this.handleUpdateReaction}
          backgroundClassName={"table-row-striped"}
          withComment={this.props.withComment}
          type={this.props.type}
        />
      );
    });
  }

  renderOrderList() {
    let orders = ["created_at", "views", "helpfuls", "priority", "comment_count"];
    if (this.locationState.checkFavorite)
      orders.unshift(`${this.getApiName().toLowerCase()}_users.favorited_at`)
    let report = "";

    if (this.locationState.searchInfo == null) {
      report = this.props.type == "faq" ? t("faquestions.index.faq_list") : t("communities.index.com_list");
    } else {
      report = t("faquestions.index.search_results", {count: this.state.countSearch || 0});
    }

    let orderBy = this.orderBy;

    let orderList = (
      <div className="order-list pull-right">
        {
          orders.map((order, index) => {
            let selected = orderBy === order ? "selected-filter" : "";

            if (this.props.type == "faq" && order === "comment_count") {
              return null;
            }

            let defaultOrder = order ;
            if (this.props.type == "community" && order == "helpfuls") {
              defaultOrder = "community_helpfuls"
            } else if (this.props.type == "community" && order == "priority") {
              defaultOrder = "severity";
            }
            return (
              <span
                onClick={() => this.handleClickOrder(order)}
                className={`pointer ${selected}`}
                style={selected ? {backgroundColor: theme.secondaryColor} : null}
                key={index}>
                {t(`faquestions.index.order.${defaultOrder}`)}
              </span>
            )
          })
        }
      </div>
    );

    return (
      <div className="row">
        {this.state.faquestions.length !== 0 ? orderList : ""}
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
    return(
      <div className="row faq-container">
        <div className="search-container">
          <SearchForm
            searchInfo={searchInfo}
            ref="searchForm"
            onSubmitSearch={this.handleSubmitSearch}
          />
        </div>
        <div className="favorite-checkbox">
          <mui.Checkbox
            label={t("faquestions.index.favorite")}
            checked={this.locationState.checkFavorite || false}
            onClick={this.handleClickFavoriteCheckbox}
          />
        </div>
        <div className="col-md-12">
          <div className="sort-faqs">
            {this.renderOrderList()}
          </div>
          <div className="faq-list">
            {this.renderFaquestionList()}

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
    );
  }
}
