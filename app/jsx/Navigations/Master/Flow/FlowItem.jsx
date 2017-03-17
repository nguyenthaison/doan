import ContentCopy from "material-ui/svg-icons/content/content-copy";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import PersonPin from "material-ui/svg-icons/maps/person-pin";

export default class FlowItem extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleClickEdit = () => {
    Helper.transitionTo(`/masterNavigation/flows/${this.props.flow.id}/edit`);
  }

  handleCopyFlow = () => {
    Helper.transitionTo(`/masterNavigation/flows/${this.props.flow.id}/clone`);
  }

  handleClickShowDetailFlow = () => {
    if (this.props.onlyImport) {
      this.props.onShowDetail(this.props.flow);
    } else {
      Helper.transitionTo(`/masterNavigation/flows/${this.props.flow.id}`);
    }
  }

  handleImportFlow = () => {
    this.props.onImport(this.props.flow);
  }

  renderImportButton() {
    return (
      <cm.RaisedButton
        onClick={this.handleImportFlow}
        label={t("common.add")}
        secondary={true} />
    );
  }

  renderEditAndCopyButton() {
    return (
      <span>
        <cm.RaisedButton
          label={t("common.copy")}
          secondary={true}
          icon={<ContentCopy />}
          onClick={this.handleCopyFlow} />
        <cm.RaisedButton
          label={t("common.edit")}
          secondary={true}
          icon={<ModeEdit />}
          onClick={this.handleClickEdit} />
      </span>
    );
  }

  render() {
    let flow = this.props.flow;
    let isComplexFlow = flow.todo_num > 1;

    return (
      <div
        onClick={this.handleClickShowDetailFlow}
        className="pointer flow-item row table-row-striped">
        <div className="flow-body col-md-9">
          <div className="flow-header">
            <label>
              <i className="material-icons" style={{color: theme.secondaryColor}}>account_circle</i>
              {flow.creator.name}
            </label>
            <label>{t("flows.index.no_id")}{flow.id}</label>
            <label>{t("common.attributes.created_at")}:{flow.created_at}</label>
            <label>{t("common.attributes.updated_at")}:{flow.updated_at}</label>
          </div>

          <div className="flow-main-content">
            <span className={`${isComplexFlow ? "complex" : "single"} flow-type`}>
              {isComplexFlow ? t("flows.complex") : t("flows.single")}
            </span>
            <div
              title={flow.name}
              className="ellipsis-text faq-title-content flow-name"
              dangerouslySetInnerHTML={{__html: flow.name.escape().replace(/ /gi, '&nbsp;')}}
              >
            </div>
          </div>
        </div>
        <div className="action-button col-md-3">
          {this.props.onlyImport ? this.renderImportButton() : this.renderEditAndCopyButton()}
        </div>
      </div>
    );
  }
}
