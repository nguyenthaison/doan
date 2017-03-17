import TeamDetail from "./TeamDetail";

export default class TeamForm extends BaseMaster.Form {
  constructor(props) {
    super(props);
    this.apiName = "Team";
    this.defaultData = {department_id: this.props.parent.id};
    this.objectDetail = TeamDetail;
  }

  renderDialogContent = () => {
    let department = this.props.parent || {};
    let organization = this.props.additionData.organization || {};

    return(
      <div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput("name", {
              maxLength: 80,
              required: true,
              })}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            <cm.TextField
              disabled={true}
              floatingLabelText={t("master.teams.organization_name")}
              value={organization.name}
              className="disabled"
              fullWidth={true}
            />
          </div>
          <div className="col-xs-6">
            <cm.TextField
              disabled={true}
              floatingLabelText={t("master.teams.department_name")}
              value={department.name}
              className="disabled"
              fullWidth={true}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {this.renderTextInput("notes", {
              maxLength: 600,
              multiLine: true,
              rowsMax: 6,
              textareaStyle: {height: "74%"}}) }
          </div>
        </div>
      </div>
    )
  }
}
