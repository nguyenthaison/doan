import Warning from "material-ui/svg-icons/alert/warning";
import AssignmentTurnedIn from "material-ui/svg-icons/action/assignment-turned-in";
import ActionPermPhoneMsg from "material-ui/svg-icons/action/perm-phone-msg";
import BasicInfo from "./BasicInfo";
import ClientLines from "../../../FaqForm/ClientLines";
import TroubleList from "../../../FaqForm/TroubleList";
import Tags from "../../../FaqForm/Tags";

export default class MetaData extends BaseComponent {
  constructor(props) {
    super(props);
  }

  getParamsForSubmit() {
    let newFlow = update(this.props.flow, {$merge: this.refs.basicInfo.getBasicInfo()})

    newFlow["client_flow_lines_attributes"] = this.refs.clientLine.getChosenLineIds();
    newFlow["flow_tags_attributes"] = this.refs.tag.getChosenTagIds();

    let troubleIds = this.refs.trouble.getTroubleIds();
    [
      newFlow["big_trouble_id"],
      newFlow["medium_trouble_id"],
      newFlow["small_trouble_id"],
      newFlow["tiny_trouble_id"]
    ] = troubleIds;

    return newFlow;
  }

  handleClickSubmit = () => {
    let flow = this.getParamsForSubmit();
    API.Flow.create(this.handleValidateCallback, flow, {only_validate: true});
  }

  handleValidateCallback = (status, data) => {
    if (status) {
      Helper.showConfirm(
        t("common.message.confirmation.title"),
        t("flows.message.confirmation"),
        this.handleConfirmSubmit);
    } else {
      Helper.showErrors(data, "flows");
    }
  }

  handleConfirmSubmit = () => {
    let flow = this.getParamsForSubmit();

    this.props.onSave(flow);
  }

  renderLabel = (fieldName, required = false) => {
    let requiredText = required ? <div className="required">{t("common.required")}</div> : "";
    return(
      <div className="form-section-title">
        {t(`faquestions.attributes.${fieldName}`)}
        {requiredText}
      </div>
    );
  }

  renderClientLines() {
    return (
      <div className="col-md-10 form-group">
        <div className="row">
          <ActionPermPhoneMsg className="form-section-icon" />
          <div className="form-section-title">
            {t("faquestions.client_lines.client_line")}
          </div>
        </div>
        <div className="client-line-field">
          <ClientLines
            ref="clientLine"
            defaultChosenClientLines={this.props.flow.client_flow_lines}
            onAdditionChangeData={this.props.onChangeData}
          />
        </div>
      </div>
    );
  }

  renderTroubles() {
    let flow = this.props.flow;
    let troubles = [
      flow.big_trouble,
      flow.medium_trouble,
      flow.small_trouble,
      flow.tiny_trouble
    ];

    return (
      <div className="col-md-10 form-group">
        <div className="row">
          <Warning className="form-section-icon" />
          {this.renderLabel("troubles")}
        </div>
        <div>
          <TroubleList
            ref="trouble"
            defaultTroubles={troubles}
            onAdditionChangeData={this.props.onChangeData}
          />
        </div>
      </div>
    );
  }

  renderTags() {
    return (
      <div className="col-md-10 form-group">
        <div className="row">
          <AssignmentTurnedIn className="form-section-icon" />
          {this.renderLabel("tags")}
        </div>
        <div>
          <Tags
            ref="tag"
            defaultFaqTags={this.props.flow.flow_tags}
            onAdditionChangeData={this.props.onChangeData}
          />
        </div>
      </div>
    );
  }

  render() {
    let flow = this.props.flow;

    return (
      <div className="meta-data">
        <BasicInfo
          ref="basicInfo"
          name={flow.name}
          stepId={flow.step_id}
          onAdditionChangeData={this.props.onChangeData}
        />
        {this.renderClientLines()}
        {this.renderTroubles()}
        {this.renderTags()}
        <div className="col-md-10 center">
        {this.props.flow.id ? null :
          <cm.RaisedButton
            label={t("common.cancel")}
            secondary={true}
            onTouchTap={() => Helper.transitionTo("/masterNavigation/flows")}
          />}
          <cm.RaisedButton
            primary={true}
            style={{marginLeft: 15}}
            onClick={this.handleClickSubmit}
            label={this.props.flow.id ? t("common.update") : t("common.save")}
          />
        </div>
      </div>
    );
  }
}
