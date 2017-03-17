import ActionDone from "material-ui/svg-icons/action/done";

export default class TroubleList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      troubles: [],
      selectedTroubles: [],
      lineTroubles: this.props.lineTroubles || [],
    };
    this.troubleDeepKeys = ["big_trouble_id", "medium_trouble_id", "small_trouble_id", "tiny_trouble_id"];
    this.troubleObjectKeys = ["big_trouble", "medium_trouble", "small_trouble", "tiny_trouble"];
    this.listSelectedTrouble = [];
  }

  getLineTroubles() {
    return this.state.lineTroubles;
  }

  componentDidMount() {
    API.Trouble.getList(this.handleGetTroubleCallback);
  }

  getChildrenLineTrouble(deep, parent) {
    let hasChild = false;
    let lineTroubles = [];

    this.state.troubles.map((child) => {
      if (child.parent_id == parent.id) {
        lineTroubles = lineTroubles.concat(this.getChildrenLineTrouble(deep + 1, child));
        hasChild = true;
      }
    });

    if (!hasChild) {
      return [
        this.getLineTroubleByTrouble(deep, parent)
      ];
    } else {
      return lineTroubles;
    }
  }

  getLineTroubleByTrouble(deep, trouble) {
    let lineTrouble = {
      big_trouble_id: null,
      medium_trouble_id: null,
      small_trouble_id: null,
      tiny_trouble_id: null,
      big_trouble: {},
      medium_trouble: {},
      small_trouble: {},
      tiny_trouble: {},
    }

    let tmpTrouble = trouble;
    for (let i = deep; i >= 0; i--) {
      lineTrouble[this.troubleDeepKeys[i]] = tmpTrouble.id;
      lineTrouble[this.troubleObjectKeys[i]] = tmpTrouble;
      let parentTrouble = this.state.troubles.find((value) => value.id === tmpTrouble.parent_id);
      tmpTrouble = parentTrouble;
    }
    return lineTrouble;
  }

  removeMarkedTrouble(deep, trouble) {
    return this.state.lineTroubles.filter(
      lineTrouble => lineTrouble[this.troubleDeepKeys[deep]] !== trouble.id);
  }

  getParentId(deep) {
    if (deep === 0) return 0;

    let parentTrouble = this.state.selectedTroubles[deep - 1];
    return parentTrouble ? parentTrouble.id : null;
  }

  isTroubleMarked(deep, trouble) {
    return this.state.lineTroubles.find(
      lineTrouble => trouble.id == lineTrouble[this.troubleDeepKeys[deep]]
    ) !== undefined;
  }

  handleClickMarkTrouble = (deep, trouble) => {
    let lineTroubles = this.state.lineTroubles;

    if (this.isTroubleMarked(deep, trouble)) {
      lineTroubles = this.removeMarkedTrouble(deep, trouble);
    } else {
      let childrenLineTroubles = this.getChildrenLineTrouble(deep, trouble);
      lineTroubles = update(lineTroubles, {$push: childrenLineTroubles});
    }

    this.setState({
      lineTroubles: lineTroubles,
    });
  }

  handleClickTrouble = (deep, trouble) => {
    let selectedTroubles = this.state.selectedTroubles;
    if (!selectedTroubles[deep] || selectedTroubles[deep].id !== trouble.id) {
      selectedTroubles[deep] = trouble;
      selectedTroubles.splice(deep + 1, selectedTroubles.length - deep);
    }

    this.setState({
      selectedTroubles: selectedTroubles,
    })
  }

  handleGetTroubleCallback = (status, data) => {
    if (!status) return;
    this.setState({troubles: data.troubles});
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
        let isSelected =
          this.state.lineTroubles.find(
            lineTrouble => trouble.id == lineTrouble[this.troubleDeepKeys[deep]]
          ) !== undefined;
        return (
          <mui.ListItem
            rightIcon={
              <ActionDone
                onClick={() => this.handleClickMarkTrouble(deep, trouble)}
                className={isSelected ? "secondary-color" : ""}
              />
            }
            key={trouble.id} primaryText={trouble.name}
            className={selectedTrouble && selectedTrouble.id === trouble.id ? "selected" : ""}
            onClick={() => this.handleClickTrouble(deep, trouble)}/>
       );
      }
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-3">
          {t("master.troubles.attributes.big_trouble")}
        </div>
        <div className="col-xs-3">
          {t("master.troubles.attributes.medium_trouble")}
        </div>
        <div className="col-xs-3">
          {t("master.troubles.attributes.small_trouble")}
        </div>
        <div className="col-xs-3">
          {t("master.troubles.attributes.tiny_trouble")}
        </div>
        <div className="row trouble">
          {this.renderTroubleCategories()}
        </div>
      </div>
    )
  }
}
