export default class FieldDetail extends BaseMaster.Detail {
  constructor(props) {
    super(props);
  }

  renderTeamDetail(data) {
    let teams = data.teams || [];
    return teams.map((team) => {
      return (
        <div key={team.id} className="team-detail">
          {team.department.organization.name + " > " + team.department.name +
            " > " + team.name}
        </div>
      )
    })
  }

  renderPrimaryFields() {
    let data = this.state.data;

    return (
      <div>
        {this.renderDataRow("name")}
        <div className="row detail-row">
          <div className="col-label item">{t("company.fields.team")}</div>
          <div className="wp-team-detail">{this.renderTeamDetail(data)}</div>
        </div>
        {this.renderDataRow({name: t("company.fields.attributes.contract_period"),
          value: Helper.formatDateRange(data["contract_start_date"], data["contract_end_date"])})}
      </div>
    );
  }
}
