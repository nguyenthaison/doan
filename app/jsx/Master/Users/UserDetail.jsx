import ExpandMore from "material-ui/svg-icons/navigation/expand-more";
import ExpandLess from "material-ui/svg-icons/navigation/expand-less";

export default class UserDetail extends BaseMaster.Detail {
  constructor(props) {
    super(props);

    this.state = update(this.state, {showLineDetail: {$set: false}});

    this.hasClientLine = true;
    this.hasOrganizationFields = true;
    this.hasField = false;
    switch (App.auth.role) {
      case "pms_admin":
        this.roles = ["admin"];
        this.hasClientLine = false;
        this.hasOrganizationFields = false;
        this.hasField = true;
        break;
      case "admin":
        this.roles = ["manager"];
        break;
      case "manager":
        this.roles = ["member"];
        break;
      default:
        this.roles = [];
    }
  }

  handleCollapseLineDetail = () => {
    this.setState({
      showLineDetail: !this.state.showLineDetail,
    });
  }

  close = () => {
    this.setState({
      show: false,
      showLineDetail: false,
    });
  }

  renderLineDetail() {
    let clientLines = this.state.data.client_user_lines || [];

    return clientLines.map((clientLine, index) => {
      let line_name_format = clientLine.line ? " > " + clientLine.line.name : "";
      return (
        <div key={index}>
          {clientLine.client.short_name + line_name_format}
        </div>
      )
    })
  }

  renderPrimaryFields() {
    let data = this.state.data;
    let companyRow = App.auth.role === "pms_admin" ? this.renderDataRow({name:
      t("master.users.attributes.company"), value: data.company ? data.company.name : ""}) : "";
    let organizationFields = (
      <div>
        {this.renderDataRow({name: t("master.users.attributes.position"),
          value: data.position ? data.position.name : ""})}
        {this.renderDataRow({name: t("master.users.attributes.organization"),
          value: data.organization ? data.organization.name : ""})}
        {this.renderDataRow({name: t("master.users.attributes.department"),
          value: data.department ? data.department.name : ""})}
        {this.renderDataRow({name: t("master.users.attributes.team"),
          value: data.team ? data.team.name : ""})}
      </div>
    );
    let clientLineField = (
      <div className="row detail-row">
        <div>
          <div className="col-label item">{t("master.users.attributes.client_lines")}</div>
          <div className="col-xs-9 item">
            <cm.RaisedButton
              label={t("common.detail")}
              labelPosition="before"
              primary={true}
              icon={this.state.showLineDetail ? <ExpandLess /> : <ExpandMore />}
              onClick={this.handleCollapseLineDetail} />
          </div>
        </div>
        {this.state.showLineDetail ? (
          <div className="client-lines-detail">
            {this.renderLineDetail()}
          </div>) : ""}
      </div>
    );

    return (
      <div className="master-user-details">
        <div className="row detail-row">
          <div className="col-label col-xs-2 item">{t("master.users.attributes.login_id")}</div>
          <div className="col-value-half item">{data.login_id}</div>
          <div className="col-label col-xs-2 item">{t("master.users.attributes.name")}</div>
          <div className="col-value-half item">{data.name}</div>
        </div>
        <div className="row detail-row">
          <div className="col-label item">{t("master.users.attributes.password")}</div>
          <div className="col-value-half item">********</div>
          <div className="col-label item">{t("master.users.attributes.name_kana")}</div>
          <div className="col-value-half item">{data.name_kana}</div>
        </div>

        {this.hasField ? companyRow : ""}
        {this.hasOrganizationFields ? organizationFields : ""}
        {this.hasClientLine ? clientLineField : ""}


        <div className="row detail-row">
          <div className="col-label item">{t("master.users.attributes.phone_number")}</div>
          <div className="col-value-half item">{data.phone_number}</div>
          <div className="col-label item">{t("master.users.attributes.internal_number")}</div>
          <div className="col-value-half item">{data.internal_number}</div>
        </div>

        <div className="row detail-row">
          <div className="col-label item">{t("master.users.attributes.email")}</div>
          <div className="col-value-half item">{data.email}</div>
          <div className="col-label item">{t("master.users.attributes.role")}</div>
          <div className="col-value-half item">{t(`master.users.roles.${data.role}`)}</div>
        </div>

        {this.renderDataRow({name: t("master.users.attributes.notes"), value: data.notes})}
      </div>
    );
  }
}
