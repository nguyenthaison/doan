import UserDetail from "./UserDetail";
import ClientLines from "../../FaqForm/ClientLines";

const styles = {
  note: {
    height: "74%",
  }
}

export default class UserForm extends BaseMaster.Form {
  constructor(props) {
    super(props);
    this.apiName = "User";
    this.objectDetail = UserDetail;
    this.tableName = "users";

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
        if (App.auth.field_id) this.roles.unshift("member");
        break;
      case "manager":
        this.roles = ["member", "manager"];
        break;
      default:
        this.roles = [];
    }

    this.defaultData = Object.keys(this.state.data).length === 0 ? {role: this.roles[0]} :
      this.state.data;

    this.state = update(this.state, {$merge: {
      companies: [],
      organizations: [],
      departments: [],
      teams: [],
      positions: [],
    }})
  }

  componentDidMount() {
    if (App.auth.role === "pms_admin") {
      API.Company.getList((status, data) =>
        this.handleGetListCallback("companies", status, data));
    } else {
      API.Position.getList((status, data) =>
        this.handleGetListCallback("positions", status, data));
      API.Team.getList((status, data) =>
        this.handleGetListCallback("teams", status, data), this.getOptions());
    }
  }

  getOptions() {
    let include = {
      department: {
        only: ["id", "name", "organization_id", "field_id"],
      }
    };

    return {include: JSON.stringify(include)};
  }

  handleGetListCallback = (type, status, data) => {
    if (!status) return;

    let newState = update(this.state, {[type]: {$set: data[type]}});
    this.setState(newState);

    API.Organization.getList(this.handleGetListOrganizationCallback);
    API.Department.getList(this.handleGetListDepartmentCallback);
  }

  handleGetListOrganizationCallback = (status, data) => {
    if (!status) return;

    let organizations = this.state.organizations
    organizations = data.organizations.filter((organization) => {
       let index = this.state.teams.findIndex(team => organization.id === team.department.organization_id);
       if (index !== -1) return true;
      }
    )

    this.setState({
      organizations: organizations,
    });
  }

  handleGetListDepartmentCallback = (status, data) => {
    if (!status) return;

    let departments = this.state.departments
    departments = data.departments.filter((department) => {
       let index = this.state.teams.findIndex(team => department.id === team.department_id);
       if (index !== -1) return true;
      }
    )

    this.setState({
      departments: departments,
    });
  }

  getDataForSubmit = () => {
    let setClientLineData = App.auth.role === "pms_admin" ? {} : {
      client_user_lines_attributes: {$set: this.refs.clientLine.getChosenLineIds()},
      client_user_lines: {$set: this.refs.clientLine.getChosenLines()},
    };
    let newData = update(this.state.data, setClientLineData);

    return newData;
  }

  renderBasicInfo() {
    return (
      <div>
        {this.renderTextInput("login_id", {
          maxLength: 20,
          required: true,
          filter: "halfsize",
        })}
        {this.renderTextInput("password", {
          maxLength: 10,
          required: true,
          type: "password",
          filter: "halfsize",
        })}
        {this.renderTextInput("name", {
          maxLength: 40,
          required: true,
        })}
        {this.renderTextInput("name_kana", {
          maxLength: 40,
          })}
      </div>
    );
  }

  renderOfficeInfo() {
    let data = this.state.data;
    let organization = data.organization || {};
    let department = data.department || {};
    let company_id = data.company_id || (App.auth.role !== "pms_admin" &&
      App.auth.company && App.auth.company.id)
    let selectFieldCompany = this.hasField ? this.renderSelectField("company",
      data.company_id, this.state.companies, {required: true}) : "";

    let organizationFields = this.hasOrganizationFields ? (
      <div>
        {this.renderSelectField("organization", data.organization_id, this.state.organizations, {
          filterKey: "company_id",
          filterValue: company_id,
          required: true,
        })}
        {this.renderSelectField("department", data.department_id, this.state.departments, {
          filterKey: "organization_id",
          filterValue: organization.id,
          required: true,
        })}
        {this.renderSelectField("team", data.team_id, this.state.teams, {
          filterKey: "department_id",
          filterValue: department.id,
          required: true,
        })}
        {this.renderSelectField("position", data.position_id, this.state.positions, {
          filterKey: "company_id",
          filterValue: company_id,
          withBlankItem: true,
        })}
      </div>
    ) : "";

    return (
      <div>
        {selectFieldCompany}
        {organizationFields}
      </div>
    );
  }

  renderContactInfo() {
    return (
      <div className="separate-2-parts">
        <div className="pull-left">
          {this.renderTextInput("phone_number", {
            maxLength: 40,
            filter: "phone_number",
          })}
        </div>
        <div className="pull-right">
          {this.renderTextInput("internal_number", {
            maxLength: 40,
            filter: "phone_number",
          })}
        </div>
      </div>
    );
  }

  renderRoles = () => {
    return this.roles.map((role, index) => {
      return (
        <mui.RadioButton
          className="role-item"
          key={index}
          value={role}
          label={t(`master.users.roles.${role}`)}
        />
      );
    });
  }

  renderRoleField() {
    return (
      <div className="form-group list-role-user">
        {this.renderLabel(t("master.users.attributes.role"), true)}
        <mui.RadioButtonGroup
          className="role-container"
          name="role"
          valueSelected={this.state.data.role}
          onChange={(event, value) => this.handleChangeTextField("role", value)}
        >
          {this.renderRoles()}
        </mui.RadioButtonGroup>
      </div>
    );
  }

  renderClientLine() {
    return (
      <div className="client-lines-user">
        <i className="material-icons form-icon">perm_phone_msg</i>
        <span className="label-name">{t("master.users.attributes.client_lines")}</span>
        <ClientLines ref="clientLine" defaultChosenClientLines={this.state.data.client_user_lines}
          fieldId={this.state.data.team ? this.state.data.team.field_id : null} />
      </div>
    )
  }

  renderDialogContent = () => {
    let clientLineField = this.hasClientLine ? this.renderClientLine() : "";

    return(
      <div className="master-user-form">
        <div className="separate-2-parts">
          <div className="pull-left">
            {this.renderBasicInfo()}
          </div>
          <div className="pull-right">
            {this.renderOfficeInfo()}
          </div>
        </div>
        {clientLineField}
        {this.renderContactInfo()}
        {this.renderTextInput("email", {
          maxLength: 150,
          filter: "halfsize",
        })}
        {this.renderRoleField()}
        {this.renderTextInput("notes", {
          maxLength: 600,
          multiLine: true,
          rowsMax: 6,
          textareaStyle: styles.note,
        })}
      </div>
    )
  }
}
