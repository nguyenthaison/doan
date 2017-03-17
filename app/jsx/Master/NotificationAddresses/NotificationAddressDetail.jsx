export default class NotificationAddressDetail extends BaseMaster.Detail {
  constructor(props) {
    super(props);
  }

  renderTeamDetail() {
    let noticeAddressTeams = this.state.data.teams || [];
    return noticeAddressTeams.map((noticeAddressTeam) => {
      return (
        <div key={noticeAddressTeam.id} className="team-detail">
          {noticeAddressTeam.department.organization.name + " > " + noticeAddressTeam.department.name +
            " > " + noticeAddressTeam.name}
        </div>
      )
    })
  }

  renderPrimaryFields() {
    let data = this.state.data;

    return (
      <div>
        {this.renderDataRow("notification_type")}
        {this.renderDataRow({name: "user",
          value: this.state.data.user.name})}
        <div className="row detail-row">
          <div className="col-label item">{t("company.fields.team")}</div>
          <div className="wp-team-detail">{this.renderTeamDetail()}</div>
        </div>
      </div>
    );
  }
}
