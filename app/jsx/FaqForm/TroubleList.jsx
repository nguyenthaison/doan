
export default class TroubleList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      troubles: [],
      selectedTroubles: update(this.props.defaultTroubles, {}) || [],
    };
  }

  getTroubleIds() {
    return this.state.selectedTroubles.map(trouble => trouble ? trouble.id : null);
  }

  getTroubles() {
    return this.state.selectedTroubles;
  }

  componentDidMount() {
    API.Trouble.getList(this.handleGetTroubleCallback, {
      only: ["id", "name", "parent_id"],
      order_by: "created_at asc",
    });
  }

  handleGetTroubleCallback = (status, data) => {
    if (!status) return;
    this.setState({troubles: data.troubles});
  }

  handleClickTrouble = (deep, trouble) => {
    let selectedTroubles = this.state.selectedTroubles;
    if (selectedTroubles[deep] && selectedTroubles[deep].id === trouble.id) {
      selectedTroubles.splice(deep, selectedTroubles.length - deep);
    }
    else {
      selectedTroubles[deep] = trouble;
    }
    selectedTroubles.splice(deep + 1, selectedTroubles.length - deep);
    this.setState({
      selectedTroubles: selectedTroubles,
    });

    if (this.props.onAdditionChangeData) this.props.onAdditionChangeData();
  }

  getParentId(deep) {
    if (deep === 0) return 0;

    let parentTrouble = this.state.selectedTroubles[deep - 1];
    return parentTrouble ? parentTrouble.id : null;
  }

  renderTroubleCategories() {
    let selectedTroubles = this.state.selectedTroubles;

    return [0,1,2,3].map((deep) => {
      let selectedTrouble = selectedTroubles[deep];

      return (
        <div key={deep} className="col-xs-3 trouble-list awesome-scroll">
          <mui.List>
            {this.renderTroubleList(selectedTrouble, deep)}
          </mui.List>
        </div>
      )
    });
  }

  renderTroubleList(selectedTrouble, deep) {
    let parentId = this.getParentId(deep);

    return this.state.troubles.map((trouble) => {
      if (parentId === trouble.parent_id) {
        return (
          <mui.ListItem
            key={trouble.id} primaryText={trouble.name}
            className={selectedTrouble && selectedTrouble.id === trouble.id ? "selected" : ""}
            onClick={() => this.handleClickTrouble(deep, trouble)}/>
       );
      }
    });
  }

  render() {
    return (
      <div className="row faq-trouble-selector">
        <div className="col-xs-3">
          {t("faquestions.troubles.big_trouble")}
        </div>
        <div className="col-xs-3">
          {t("faquestions.troubles.medium_trouble")}
        </div>
        <div className="col-xs-3">
          {t("faquestions.troubles.small_trouble")}
        </div>
        <div className="col-xs-3">
          {t("faquestions.troubles.tiny_trouble")}
        </div>
        <div className="row trouble">
          {this.renderTroubleCategories()}
        </div>
      </div>
    );
  }
}
