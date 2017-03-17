import FieldDetail from "./FieldDetail";
import FieldTeam from "./FieldTeam";

export default class FieldForm extends BaseMaster.Form {
  constructor(props) {
    super(props);
    this.apiName = "Field";
    this.objectDetail = FieldDetail;
    this.showDeleteButton = false;
  }

  getDataForSubmit() {
    let newData = update(this.state.data, {
      team_ids: {$set: this.refs.fieldTeam.getChosenTeamIds()},
      teams: {$set: this.refs.fieldTeam.getChosenTeams()},
    });
    return newData;
  }

  renderDialogContent() {
    let field = this.state.data;
    if (!field) return;

    return(
      <div className="field-form">
        <div className="field-info">
          <div className="row">
            <div className="col-xs-6">
              <div>
                <label className="small-label">{t("company.fields.attributes.id")}</label>
              </div>
              <div>
                <span>{field.id}</span>
              </div>
            </div>
            <div className="col-xs-6">
              <div>
                <label className="small-label">{t("company.fields.attributes.name")}</label>
              </div>
              <div>
                <span>{field.name}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row selected-team">
          <div className="col-xs-12">
          <i className="material-icons form-icon">supervisor_account</i>
            <span className="label-name">{t("company.fields.team")}</span>
            <div className="troubles">
              <FieldTeam
                ref="fieldTeam"
                defaultTeams={field.teams}
                allowAddingTeamHasField={false}
              />
            </div>
          </div>
        </div>
        <div className="contract-period">
          <div className="row">
            <div className="col-xs-2">
              <span className="txt-bold">{t("company.fields.attributes.contract_period")}</span>
            </div>
            <div className="col-xs-3">
              <span>{Helper.formatDateRange(field["contract_start_date"], field["contract_end_date"])}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
