import SearchForm from "./SearchForm";
import FlowItem from "./FlowItem";

const takeRecord = 20;

export default class NavigationFlow extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      flows: [],
    };

    this.take = takeRecord;
  }

  get locationState() {
    return this.props.locationState || this.props.location.state || {};
  }

  componentDidMount() {
    this.setToolBar(t("navigations.header_title"), "/masterNavigation/flows/new");

    this.getFlowList(this.locationState);
  }

  componentWillReceiveProps(nextProps) {
    let locationState = nextProps.locationState || nextProps.location.state || {};
    this.getFlowList(locationState);
  }

  getSearchFilter() {
    let searchInfo = this.refs.searchForm.getSearchInfo();
    let filter = {
      client_line_ids: {
        client_ids: searchInfo.lines.map(clientLine => !clientLine.line && clientLine.client.id),
        line_ids: searchInfo.lines.map(clientLine => clientLine.line && clientLine.line.id),
      },
      trouble_ids: searchInfo.troubles.map(trouble => trouble.id),
      tag_ids: {
        parent_tag_ids: searchInfo.tags.map(faqTag => !faqTag.tag && faqTag.parent_tag.id),
        child_tag_ids: searchInfo.tags.map(faqTag => faqTag.tag && faqTag.tag.id),
      },
      step_ids: searchInfo.steps.map(step => step.id),
    };

    return filter;
  }

  getFlowList(locationState) {
    let searchInfo = locationState.searchInfo || {};
    let filter = this.getSearchFilter();
    let include = {
      creator: {only: ["name"]},
      step: {only: ["name"]},
      client_flow_lines: {
        include: {
          client: {only: ["id", "name"]},
          line: {only: ["id", "name"]},
        }
      },
      flow_tags: {
        include: {
          tag: {only: ["id", "name"]},
          parent_tag: {only: ["id", "name"]},
        }
      },
      big_trouble: {only: ["id", "name"]},
      medium_trouble: {only: ["id", "name"]},
      small_trouble: {only: ["id", "name"]},
      tiny_trouble: {only: ["id", "name"]},
      todos: {include: {nodes: {}, parent_todo: {}, attachments: {}}},
    };

    let options = {
      take: this.take,
      count: true,
      only: ["id", "name"],
      methods: ["todo_num"],
      include: JSON.stringify(include),
      filter: filter,
      search_query: searchInfo.query,
      includes: ["step"],
      order_by: "steps.id asc",
    };

    API.Flow.getList(this.handleSearchFlowCallback, options);
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

  handleSearchFlowCallback = (status, data) => {
    if (!status) return;
    this.setState({
      flows: data.flows,
      hasMore: data.has_more,
      count: data.count,
    });
  }

  handleClickLoadMore = () => {
    this.take += takeRecord;
    this.getFlowList(this.locationState);
  }

  renderSearchReport() {
    let report = "";

    if (this.locationState.searchInfo == null) {
      report = t("flows.index.flow_list");
    } else {
      report = t("flows.index.search_results", {count: this.state.count || 0});
    }
    return report;
  }

  renderFlowList() {
    let flows = this.state.flows;
    if (flows.length === 0 && this.locationState.searchInfo == null)
      return <div className="no-record">{t("common.message.no_record")}</div>;

    return flows.map((flow) => {
      return (
        <FlowItem
          onImport={this.props.onImport}
          onShowDetail={this.props.onShowDetail}
          onlyImport={this.props.onlyImport}
          key={flow.id}
          flow={flow}
        />
      );
    });
  }

  render() {
    let searchInfo = this.locationState.searchInfo;

    return (
      <div className="row faq-container flow-index">
        <div className="search-container">
          <SearchForm
            searchInfo={searchInfo}
            ref="searchForm"
            onSubmitSearch={this.handleSubmitSearch}
          />
        </div>
        <div className="search-report">
          {this.renderSearchReport()}
        </div>
        <div className="flow-list">
          {this.renderFlowList()}
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
    );
  }
}
