import TroubleList from "../../FaqForm/TroubleList";
import SearchIcon from "material-ui/svg-icons/action/search";

const styles = {
  button: {minWidth: "110px"},
  searchButton: {width: "130px", height: "49px", lineHeight: "49px"},
}

export default class SearchForm extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchInfo: {
        troubles: [],
      },
      openTrouble: false,
    };
  }

  getSearchInfo() {
    return this.state.searchInfo;
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props) && nextProps.selectedTroubles) {
      this.setState({
        searchInfo: {
          troubles: nextProps.selectedTroubles,
        },
      });
    }
  }

  handleOpenTroubleDialog = () => {
    let state = update(this.state, {openTrouble: {$set: true}});
    this.setState(state);
  }

  handleCloseTroubleDialog = () => {
    let state = update(this.state, {openTrouble: {$set: false}});
    this.setState(state);
  }

  handleChangeSearchText = (event) => {
    let searchInfo = update(this.state.searchInfo, {query: {$set: event.target.value}});
    this.setState({searchInfo: searchInfo});
  }

  handleSubmitTroubleSearch = () => {
    let searchInfo = update(this.state.searchInfo,
      {troubles: {$set: this.refs.trouble.getTroubles()}});
    this.setState({
      openTrouble: false,
      searchInfo: searchInfo,
    });
  }

  handleRemoveTroubleSearch = (event) => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.delete_search_item"),
      this.handleConfirmClearTrouble);

    event.stopPropagation();
  }

  handleConfirmClearTrouble = () => {
    let searchInfo = update(this.state.searchInfo, {troubles: {$set: []}});

    this.setState({searchInfo: searchInfo});
  }

  handleKeyDownSearch = (event) =>{
    if (event.keyCode === 13) {
      this.props.onSubmitSearch(this.state.searchInfo);
    }
  }

  renderTroubleSearch() {
    let searchContent = "";
    for (let trouble of this.state.searchInfo.troubles) {
      searchContent += trouble.name + " > ";
    };
    searchContent = searchContent.slice(0, searchContent.length - 3)

    let actionButton = (
      <cm.RaisedButton
        style={styles.button}
        label={t("common.submit")}
        primary={true}
        onClick={this.handleSubmitTroubleSearch}
      />
    );

    return (
      <div className="trouble-search pointer" onClick={this.handleOpenTroubleDialog}>
        <mui.Paper
          title={searchContent}
          zDepth={0}
          className="trouble-field pointer"
        >
          <div>
            <i className="material-icons" style={{color: theme.secondaryColor}}>warning</i>
            {t("app.search_drawer.troubles")}
          </div>
          <div className="ellipsis-text">
            {this.renderClearSearchIcon()}
            {searchContent}
          </div>
        </mui.Paper>

        <cm.Dialog
          title={t("faquestions.troubles.title")}
          icon={<i className="material-icons">warning</i>}
          actions={actionButton}
          onRequestClose={this.handleCloseTroubleDialog}
          open={this.state.openTrouble}
          className="search-faq-dialog"
        >
          <TroubleList ref="trouble" defaultTroubles={this.state.searchInfo.troubles} />
        </cm.Dialog>
      </div>
    );
  }

  renderClearSearchIcon() {
    if (this.state.searchInfo.troubles.length == 0) return null;
    return (
      <i
        className="material-icons"
        onClick={(event) => this.handleRemoveTroubleSearch(event)}>cancel
      </i>
    );
  }

  render() {
    return (
      <div>
        <input
          value={this.state.searchInfo.query || ""}
          className="search-input"
          placeholder={t("common.search")}
          onKeyDown={this.handleKeyDownSearch}
          onChange={(event) => this.handleChangeSearchText(event)}
        />

        {this.props.tabIndex !== this.props.tabIndexes.notification ?
          this.renderTroubleSearch() : null}

        <div className="search-button">
          <cm.RaisedButton
            onTouchTap={() => this.props.onSubmitSearch(this.state.searchInfo)}
            label={t("common.search")}
            primary={true}
            style={styles.searchButton}
            icon={<SearchIcon />}
          />
        </div>
      </div>
    );
  }
}
