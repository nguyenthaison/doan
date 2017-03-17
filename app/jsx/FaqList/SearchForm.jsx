import ClientLines from "../FaqForm/ClientLines";
import ActionSearch from "material-ui/svg-icons/action/search";
import TroubleList from "../FaqForm/TroubleList";
import Tags from "../FaqForm/Tags";

export default class SearchForm extends BaseComponent {
  constructor(props) {
    super(props);

    let searchInfo = this.props.searchInfo ? this.props.searchInfo : this.getEmptySearchInfo();

    this.state = {
      openClientLine: false,
      openTrouble: false,
      openTag: false,
      searchInfo: searchInfo,
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
    return {
      query: "",
      lines: [],
      troubles: [],
      tags: [],
    };
  }

  handleOpenDialog = (dialogName) => {
    dialogName = `open${dialogName}`;

    let state = update(this.state, {[dialogName]: {$set: true}})
    this.setState(state);
  }

  handleCloseDialog = (dialogName) => {
    dialogName = `open${dialogName}`;

    let state = update(this.state, {[dialogName]: {$set: false}})
    this.setState(state)
  }

  handleSubmitClientLineSearch = () => {
    let searchInfo = update(this.state.searchInfo,
      {lines: {$set: this.refs.clientLine.getChosenLines()}});
    this.setState({
      openClientLine: false,
      searchInfo: searchInfo,
    });
  }

  handleSubmitTroubleSearch = () => {
    let searchInfo = update(this.state.searchInfo,
      {troubles: {$set: this.refs.trouble.getTroubles()}});
    this.setState({
      openTrouble: false,
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

  handleChangeSearchText = (event) => {
    let searchInfo = update(this.state.searchInfo, {query: {$set: event.target.value}});
    this.setState({searchInfo: searchInfo});
  }

  handleKeyDownSearch = (event) =>{
    if (event.keyCode === 13) {
      this.props.onSubmitSearch();
    }
  }

  handleConfirmDelete = (field) => {
    let searchInfo = update(this.state.searchInfo, {[field]: {$set: []}});

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
    if (this.state.searchInfo[fieldSearch] && this.state.searchInfo[fieldSearch].length !== 0) {
      return (
        <i
          className="material-icons" style={{color: theme.secondaryColor}}
          onClick={(event) => this.handleRemoveDataSearch(event, fieldSearch)}>cancel
        </i>
      );
    } else {
      return "";
    }
  }

  renderActionButton(onClick) {
    let actionButton = (
      <cm.RaisedButton
        style={{minWidth: "110px"}}
        label={t("common.submit")}
        onClick={onClick}
        primary={true}/>
    );
    return actionButton;
  }

  renderClientLineSearch() {
    let searchContent = "";
    if (this.state.searchInfo.lines) {
      for (let clientLine of this.state.searchInfo.lines) {
        let lineNameFormat = clientLine.line ? " > " + clientLine.line.name + " ; " : " ; ";
        searchContent += clientLine.client.short_name + lineNameFormat
      };
      searchContent = searchContent.slice(0, searchContent.length - 3);
    }

    return (
      <div>
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
          actions={this.renderActionButton(this.handleSubmitClientLineSearch)}
          onRequestClose={() => this.handleCloseDialog("ClientLine")}
          open={this.state.openClientLine}
          className="search-faq-dialog"
        >
          <ClientLines ref="clientLine" defaultChosenClientLines={this.state.searchInfo.lines} />
        </cm.Dialog>
      </div>
    )
  }

  renderTroubleSearch() {
    let searchContent = "";
    if (this.state.searchInfo.troubles) {
      for (let trouble of this.state.searchInfo.troubles) {
        searchContent += trouble.name + " > ";
      };
      searchContent = searchContent.slice(0, searchContent.length - 3)
    }

    return (
      <div>
        <mui.Paper
          title={searchContent}
          zDepth={0}
          className="search-field pointer"
          onClick={() => this.handleOpenDialog("Trouble")}>
          <div>
            <i className="material-icons" style={{color: theme.secondaryColor}}>warning</i>
            {t("faquestions.troubles.title")}
          </div>
          <div className="ellipsis-text">
            {this.renderClearSearchIcon("troubles")}
            {searchContent}
          </div>
        </mui.Paper>

        <cm.Dialog
          title={t("faquestions.troubles.title")}
          icon={<i className="material-icons" style={{color: theme.secondaryColor}}>warning</i>}
          actions={this.renderActionButton(this.handleSubmitTroubleSearch)}
          onRequestClose={() => this.handleCloseDialog("Trouble")}
          open={this.state.openTrouble}
          className="search-faq-dialog"
        >
          <TroubleList ref="trouble" defaultTroubles={this.state.searchInfo.troubles} />
        </cm.Dialog>
      </div>
    );
  }

  renderTagSearch() {
    let searchContent = "";
    if (this.state.searchInfo.tags) {
      for (let faqTag of this.state.searchInfo.tags) {
        let childTagFormat = faqTag.tag ? " > " + faqTag.tag.name + " ; " : " ; ";
        searchContent += faqTag.parent_tag.name + childTagFormat;
      };
      searchContent = searchContent.slice(0, searchContent.length - 3);
    }

    return (
      <div>
        <mui.Paper
          title={searchContent}
          zDepth={0}
          className="search-field pointer"
          onClick={() => this.handleOpenDialog("Tag")}>
          <div>
            <i className="material-icons"
              style={{color: theme.secondaryColor}}>assignment_turned_in</i>
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
          actions={this.renderActionButton(this.handleSubmitTagSearch)}
          onRequestClose={() => this.handleCloseDialog("Tag")}
          open={this.state.openTag}
          className="search-faq-dialog"
        >
          <Tags ref="tag" defaultFaqTags={this.state.searchInfo.tags} />
        </cm.Dialog>
      </div>
    );
  }

  renderQueryAndSearchButton() {
    return (
      <div className="row query-search">
        <div className="query col-md-10">
          <input
            value={this.state.searchInfo.query || ""}
            className="search-input"
            placeholder={t("common.search")}
            onKeyDown={this.handleKeyDownSearch}
            onChange={(event) => this.handleChangeSearchText(event)}
          />
        </div>
        <div className="search-button">
          <cm.RaisedButton
            className="pull-right big-icon"
            onTouchTap={this.props.onSubmitSearch}
            label={t("common.search")}
            primary={true}
            style={{width: "130px", height: "49px", lineHeight: "49px"}}
            icon={<ActionSearch />}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col col-md-6">{this.renderClientLineSearch()}</div>
          <div className="col col-md-3">{this.renderTroubleSearch()}</div>
          <div className="col col-md-3">{this.renderTagSearch()}</div>
        </div>
        {this.renderQueryAndSearchButton()}
      </div>
    );
  }
}
