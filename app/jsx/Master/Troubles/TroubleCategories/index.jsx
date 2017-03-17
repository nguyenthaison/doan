import TroubleForm from "./TroubleForm";
import TroubleDetail from "./TroubleDetail";
import EditorBorderColor from "material-ui/svg-icons/editor/border-color";

export default class TroubleCategories extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      troubles: [],
      error: "",
    }

    this.transPath = "master.troubles";
  }

  getOptions() {
    return {
      include: JSON.stringify({
        creator: {only: ["name"]},
        updater: {only: ["name"]},
      }),
      order_by: "created_at asc",
    }
  }

  componentDidMount() {
    API.Trouble.getList(this.handleGetDataListCallback, this.getOptions());
  }

  handleGetDataListCallback = (status, data) => {
    if (!status) return;

    this.setState({
      troubles: data.troubles,
    });
  }

  getUniqueLineTrouble(deep, parentId) {
    let listTroubles = this.state.troubles;
    let arrayTrouble = [];
    listTroubles.map((lineTrouble) => {
      if (lineTrouble &&
        lineTrouble.parent_id === parentId &&
        arrayTrouble.findIndex((trouble) => trouble.id === lineTrouble.id) === -1
      ) {
        arrayTrouble.push(lineTrouble);
      }
    });
    return arrayTrouble;
  }

  handleSubmitForm = () => {
    API.Trouble.getList(this.handleGetDataListCallback, this.getOptions());
  }

  handleClickCreate = (deep) => {
    let additionData = {
      deep: deep,
      troubles: this.state.troubles
    };
    this.refs.troubleForm.open(null, additionData);
  }

  handleClickEdit = (trouble, deep) => {
    let additionData = {
      deep: deep,
      troubles: this.state.troubles
    };
    this.refs.troubleForm.open(trouble, additionData);
  }

  handleClickDetail = (trouble, deep) => {
    let additionData = {
      deep: deep,
      troubles: this.state.troubles
    };
    this.refs.troubleDetail.open(trouble, additionData);
  }

  renderTroubleList(deep, parentId) {
    if (deep >= 4) {
      return;
    }
    let uniqueLineTrouble = this.getUniqueLineTrouble(deep, parentId);
    let rightSide = 100 - (deep * 25);
    let leftWidth = (25 / rightSide) * 100;
    let rightWidth = 100 - leftWidth;

    return uniqueLineTrouble.map((trouble) => {
      return (
        <div className="trouble-item" key={trouble.id}>
          <div className="pull-left left-side" style={{width: leftWidth + "%"}}>
            <div className="pull-left">
              <span className="detail" onTouchTap={() => this.handleClickDetail(trouble, deep)}>
                {trouble.name}
              </span>
            </div>
            <div className="pull-right">
              <EditorBorderColor
                onClick={(event) => this.handleClickEdit(trouble, deep)}
                className="btn-edit"
              />
            </div>
          </div>
          <div className="pull-right" style={{width: rightWidth + "%"}}>
            {this.renderTroubleList(deep + 1, trouble.id)}
          </div>
          <div className="clearfix"></div>
        </div>
      )
    })
  }

  renderButton(deep, field) {
    return (
      <div className="trouble-category">
        <div className="field-name pull-left">
          {field}
        </div>
        <button
          type="button"
          className="btn btn-trouble-create"
          onClick={(event) => this.handleClickCreate(deep)}
        >
          <i className="material-icons">add_circle_outline</i>
          {t("common.create")}
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="base-master-index">
        <BaseMaster.ListHeader
          icon={<i className="material-icons icon-header">warning</i>}
          title={t("master.troubles.title")}>
        </BaseMaster.ListHeader>
        <div className="master-trouble-index body-index">
          <div className="sub-header">
            <div className="content">
              {this.renderButton(0, t("master.troubles.attributes.big_trouble"))}
              {this.renderButton(1, t("master.troubles.attributes.medium_trouble"))}
              {this.renderButton(2, t("master.troubles.attributes.small_trouble"))}
              {this.renderButton(3, t("master.troubles.attributes.tiny_trouble"))}
            </div>
          </div>
          <div className="trouble-table-wrapper">
            <div className="trouble-table">
              {this.renderTroubleList(0, 0)}
            </div>
          </div>
          <TroubleForm
            ref="troubleForm"
            transPath={this.transPath}
            onSubmit={this.handleSubmitForm}
            />
          <TroubleDetail
            ref="troubleDetail"
            transPath={this.transPath}
            name="troubles"
            />
        </div>
      </div>
    );
  }
}
