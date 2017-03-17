export default class TeamDetail extends BaseMaster.Detail {
  renderPrimaryFields() {
    let department = this.props.parent || {};
    let organization = this.props.additionData.organization || {};
    let data = this.state.data;

    return (
      <div>
        {this.renderDataRow("name")}
        {this.renderDataRow({name: t("master.teams.organization_name"), value: organization.name})}
        {this.renderDataRow({name: t("master.teams.department_name"), value: department.name})}
        {this.renderDataRow("notes")}
      </div>
    );
  }
}
