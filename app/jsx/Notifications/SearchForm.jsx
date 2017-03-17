import ClientLines from "../FaqForm/ClientLines";
import ActionSearch from "material-ui/svg-icons/action/search";
import Tags from "../FaqForm/Tags";
import TeamList from "../FaqForm/TeamList";
import TimeRangeSearch from "./TimeRangeSearch";

export default class SearchForm extends BaseComponent {
  constructor(props) {
    super(props);

    let searchInfo = this.props.searchInfo || this.getEmptySearchInfo();

    this.state = {
      searchInfo: searchInfo,
      openClientLine: false,
      openTag: false,
      openTeam: false,
      openTimeRange: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchInfo: nextProps.searchInfo || this.getEmptySearchInfo(),
    });
  }

  getSearchInfo() {
    return this.state.searchInfo;
  }

  getEmptySearchInfo() {
    let emptySearchInfo = {
      query: "",
      lines: [],
      tags: [],
      teams: [],
      timeRange: {},
    };
    return emptySearchInfo;
  }

  getFormattedDate(dateString) {
    if (!dateString) return "";
    return Helper.formatDate(dateString);
  }

  getActionButton(onClick) {
    let actionButton = (
      <cm.RaisedButton
        style={{minWidth: "110px"}}
        label={t("common.submit")}
        onClick={onClick}
        primary={true}/>
    );
    return actionButton;
  }

  handleOpenDialog = (dialogName) => {
    dialogName = `open${dialogName}`;

    let state = update(this.state, {[dialogName]: {$set: true}});
    this.setState(state);
  }

  handleCloseDialog = (dialogName) => {
    dialogName = `open${dialogName}`;

    let state = update(this.state, {[dialogName]: {$set: false}});
    this.setState(state);
  }

  handleSubmitClientLineSearch = () => {
    let searchInfo = update(this.state.searchInfo,
      {lines: {$set: this.refs.clientLine.getChosenLines()}});
    this.setState({
      openClientLine: false,
      searchInfo: searchInfo,
    });
  }

  handleSubmitTagSearch = () => {
    let searchInfo = update(this.state.searchInfo,
      {tags: {$set: this.refs.tag.getChosenTags()}});
    this.setState({
      openTag: false,
      searchInfo: searchInfo,
    });
  }

  handleSubmitTeamSearch = () => {
    let searchInfo = update(this.state.searchInfo,
      {teams: {$set: this.refs.teamList.getCheckedTeams()}});
    this.setState({
      openTeam: false,
      searchInfo: searchInfo,
    });
  }

  handleChangeSearchText = (event) => {
    let searchInfo = update(this.state.searchInfo, {query: {$set: event.target.value}});
    this.setState({searchInfo: searchInfo});
  }

  handleSubmitTimeRangeSearch = () => {
    let searchInfo = update(this.state.searchInfo,
      {timeRange: {$set: this.refs.timeRange.getTimeRange()}});

    this.setState({
      openTimeRange: false,
      searchInfo: searchInfo,
    });
  }

  handleKeyDownSearch = (event) =>{
    if (event.keyCode === 13) {
      this.props.onSubmitSearch();
    }
  }

  handleConfirmDelete = (field) => {
    let searchInfo = null;
    if (field === "timeRange") {
      searchInfo = update(this.state.searchInfo, {timeRange: {$set: {}}});
    } else {
      searchInfo = update(this.state.searchInfo, {[field]: {$set: []}});
    }

    this.setState({searchInfo: searchInfo});
  }

  handleRemoveDataSearch = (e, field) => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.delete_search_item"),
      () => this.handleConfirmDelete(field));

    e.stopPropagation();
  }

  renderClearSearchIcon(fieldSearch) {
    let searchInfo = this.state.searchInfo;
    if (searchInfo[fieldSearch] && Object.keys(searchInfo[fieldSearch]).length !== 0) {
      return (
        <i
          className="material-icons remove-search-icon"
          onClick={(event) => this.handleRemoveDataSearch(event, fieldSearch)}>cancel
        </i>
      );
    } else {
      return "";
    }
  }

  renderClientLineSearch() {
    let searchContent = "";
    if (this.state.searchInfo.lines) {
      for (let clientLine of this.state.searchInfo.lines) {
        let lineNameFormat = clientLine.line ? " > " + clientLine.line.name + " ; " : " ; ";
        searchContent += clientLine.client.short_name + lineNameFormat;
      };
    }
    searchContent = searchContent.slice(0, searchContent.length - 3);

    return (
      <div className="col-md-6">
        <mui.Paper
          title={searchContent}
          zDepth={0}
          className="search-field pointer"
          onClick={() => this.handleOpenDialog("ClientLine")}>
          <div>
            <i className="material-icons" style={{color: theme.secondaryColor}}>perm_phone_msg</i>
            {t("faquestions.client_lines.client_line")}
          </div>
          <div className="ellipsis-text">
            {this.renderClearSearchIcon("lines")}
            {searchContent}
          </div>
        </mui.Paper>

        <cm.Dialog
          title={t("faquestions.client_lines.client_line")}
          icon={<i className="material-icons" style={{color: theme.secondaryColor}}>perm_phone_msg</i>}
          actions={this.getActionButton(this.handleSubmitClientLineSearch)}
          onRequestClose={() => this.handleCloseDialog("ClientLine")}
          open={this.state.openClientLine}
          className="search-faq-dialog">
          <ClientLines ref="clientLine" defaultChosenClientLines={this.state.searchInfo.lines}/>
        </cm.Dialog>
      </div>
    )
  }

  renderTagSearch() {
    let searchContent = "";
    if (this.state.searchInfo.tags) {
      for (let notificationTag of this.state.searchInfo.tags) {
        let childTagFormat = notificationTag.tag ? " > " + notificationTag.tag.name + " ; " : " ; ";
        searchContent += notificationTag.parent_tag.name + childTagFormat;
      };
    }
    searchContent = searchContent.slice(0, searchContent.length - 3);

    return (
      <div className="col-md-3">
        <mui.Paper
          title={searchContent}
          zDepth={0}
          className="search-field pointer"
          onClick={() => this.handleOpenDialog("Tag")}>
          <div>
            <i className="material-icons" style={{color: theme.secondaryColor}}>assignment_turned_in</i>
            {t("faquestions.tags.tags")}
          </div>
          <div className="ellipsis-text">
            {this.renderClearSearchIcon("tags")}
            {searchContent}
          </div>
        </mui.Paper>
        <cm.Dialog
          title={t("faquestions.tags.tags")}
          icon={<i className="material-icons" style={{color: theme.secondaryColor}}>assignment_turned_in</i>}
          actions={this.getActionButton(this.handleSubmitTagSearch)}
          onRequestClose={() => this.handleCloseDialog("Tag")}
          open={this.state.openTag}
          className="search-faq-dialog">
          <Tags ref="tag" defaultFaqTags={this.state.searchInfo.tags}/>
        </cm.Dialog>

      </div>
    );
  }

  renderTeamSearch() {
    let searchContent = "";
    if (this.state.searchInfo.teams) {
      for (let team of this.state.searchInfo.teams) {
        searchContent += team.name + " ; ";
      };
    }

    searchContent = searchContent.slice(0, searchContent.length - 3);
    return (
      <div className="col-md-3">
        <mui.Paper
          title={searchContent}
          zDepth={0}
          className="search-field pointer"
          onClick={() => this.handleOpenDialog("Team")}>
          <div>
            <i className="material-icons" style={{color: theme.secondaryColor}}>person_pin</i>
            {t("notifications.attributes.team")}
          </div>
          <div className="ellipsis-text">
            {this.renderClearSearchIcon("teams")}
            {searchContent}
          </div>
        </mui.Paper>
        <cm.Dialog
          title={t("notifications.attributes.team")}
          icon={<i className="material-icons" style={{color: theme.secondaryColor}}>person_pin</i>}
          actions={this.getActionButton(this.handleSubmitTeamSearch)}
          onRequestClose={() => this.handleCloseDialog("Team")}
          open={this.state.openTeam}
          className="search-faq-dialog select-team-dialog">
          <TeamList
            defaultCheckedTeams={this.state.searchInfo.teams}
            withoutTitle={true}
            ref="teamList"/>
        </cm.Dialog>
      </div>
    );
  }

  renderTimeRangeDialog() {
    let timeRange = this.state.searchInfo.timeRange || {};
    let searchContent = "";

    if(timeRange.start_date || timeRange.end_date){
      searchContent = this.getFormattedDate(timeRange.start_date) + "~" + this.getFormattedDate(timeRange.end_date);
    }

    return(
      <div className="col-md-3 select-time-range">
        <mui.Paper
          title={searchContent}
          zDepth={0}
          className="search-field pointer"
          onClick={() => this.handleOpenDialog("TimeRange")}>
          <div>
            <i className="material-icons date-range-icon" style={{color: theme.secondaryColor}}>event_note</i>
            {searchContent}
            {this.renderClearSearchIcon("timeRange")}
          </div>
        </mui.Paper>
        <cm.Dialog
          title={t("notifications.index.search.period")}
          icon={<i className="material-icons" style={{color: theme.secondaryColor}}>person_pin</i>}
          actions={this.getActionButton(this.handleSubmitTimeRangeSearch)}
          onRequestClose={() => this.handleCloseDialog("TimeRange")}
          open={this.state.openTimeRange}
          className="search-faq-dialog">
          <TimeRangeSearch ref="timeRange" defaultTimeRange={this.state.searchInfo.timeRange}/>
        </cm.Dialog>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="row">
          {this.renderClientLineSearch()}
          {this.renderTagSearch()}
          {this.renderTeamSearch()}
        </div>
        <div className="row query-search">
          <div className="query col-md-10">
            {this.renderTimeRangeDialog()}
            <div className="col-md-9">
              <input
                value={this.state.searchInfo.query || ""}
                onKeyDown={this.handleKeyDownSearch}
                onChange={(event) => this.handleChangeSearchText(event)}
                className="search-input"
                placeholder={t("common.search")}
              />
            </div>
          </div>
          <div className="search-button">
            <cm.RaisedButton
              onTouchTap={this.props.onSubmitSearch}
              className="pull-right big-icon"
              label={t("common.search")}
              primary={true}
              style={{width: "130px", height: "49px", lineHeight: "49px"}}
              icon={<ActionSearch />}
            />
          </div>
        </div>
      </div>
    );
  }
}
