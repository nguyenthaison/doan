import DepartmentDetail from "./DepartmentDetail";

export default class DepartmentForm extends BaseMaster.Form {
  constructor(props) {
    super(props);
    this.apiName = "Department";
    this.defaultData = {organization_id: this.props.parent.id};
    this.objectDetail = DepartmentDetail;
  }

  renderDialogContent = () => {
    let organization = this.props.parent || {};
    return(
      <div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput("name", {
              maxLength: 80,
              required: true,
            })}
          </div>
          <div className="col-xs-6">
            <cm.TextField
              disabled={true}
              floatingLabelText={t("master.departments.organization_name")}
              value={organization.name}
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
