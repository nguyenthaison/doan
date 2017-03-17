import FaqSearchForm from "../../../FaqList/SearchForm";
import StepList from "./Step";

export default class SearchForm extends FaqSearchForm {
  constructor(props) {
    super(props);

    let searchInfo = this.props.searchInfo ? this.props.searchInfo : this.getEmptySearchInfo();

    this.state = {
      openClientLine: false,
      openTrouble: false,
      openTag: false,
      openStep: false,
      searchInfo: searchInfo,
    }
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
      steps: [],
    };
  }

  handleSubmitStepSearch = () => {
    let searchInfo = update(this.state.searchInfo,
      {steps: {$set: this.refs.stepList.getCheckedSteps()}});
    this.setState({
      openStep: false,
      searchInfo: searchInfo,
    });
  }

  renderStepSearch() {
    let searchContent = "";
    if (this.state.searchInfo.steps) {
      for (let step of this.state.searchInfo.steps) {
        searchContent += step.name + " ; ";
      };
    }

    searchContent = searchContent.slice(0, searchContent.length - 3);
    return (
      <div>
        <mui.Paper
          title={searchContent}
          zDepth={0}
          className="search-field pointer"
          onClick={() => this.handleOpenDialog("Step")}>
          <div>
            <i className="material-icons"
              style={{color: theme.secondaryColor}}>view_list</i>
            {t("flows.attributes.step")}
          </div>
          <div className="ellipsis-text">
            {this.renderClearSearchIcon("steps")}
            {searchContent}
          </div>
        </mui.Paper>
        <cm.Dialog
          title={t("flows.attributes.step")}
          icon={<i className="material-icons">view_list</i>}
          actions={this.renderActionButton(this.handleSubmitStepSearch)}
          onRequestClose={() => this.handleCloseDialog("Step")}
          open={this.state.openStep}
          className="search-faq-dialog select-team-dialog">
          <StepList
            defaultCheckedSteps={this.state.searchInfo.steps}
            ref="stepList"/>
        </cm.Dialog>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col col-md-4">{this.renderClientLineSearch()}</div>
          <div className="col col-md-3">{this.renderTroubleSearch()}</div>
          <div className="col col-md-3">{this.renderTagSearch()}</div>
          <div className="col col-md-2">{this.renderStepSearch()}</div>
        </div>
        {this.renderQueryAndSearchButton()}
      </div>
    );
  }
}
