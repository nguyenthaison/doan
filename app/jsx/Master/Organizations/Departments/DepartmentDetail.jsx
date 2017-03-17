export default class DepartmentDetail extends BaseMaster.Detail {
  renderPrimaryFields() {
    let organization = this.props.parent || {};
    let data = this.state.data;

    return (
      <div>
        {this.renderDataRow("name")}
        {this.renderDataRow({name: t("master.departments.organization_name"), value: organization.name})}
        {this.renderDataRow("notes")}
      </div>
    );
  }
}
