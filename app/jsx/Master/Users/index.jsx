import UserDetail from "./UserDetail";
import UserForm from "./UserForm";

export default class Users extends BaseMaster.List{
  constructor(props) {
    super(props);
    this.apiName = "User";
    this.tableName = "users";
    this.transPath = "master.users";
    this.iconHeader = "account_circle";
    this.fields = [
      {name: "login_id", width: 1},
      {name: "name", width: 2},
      {name: "name_kana", width: 1},
      {name: "company", width: 2, transform: (item) => {return item.company.name}},
      {name: "role", width: 1, transform: (item) => {return t(`master.users.roles.${item.role}`)}},
    ];
    this.objectDetail = UserDetail;
    this.objectForm = UserForm;
  }

  getOptions() {
    return {
      include: {
        client_user_lines: {
          include: {
            client: {only: ["id", "short_name"]},
            line: {only: ["id", "name"]}
          },
        },
        company: {only: ["id", "name"]},
        position: {only: ["id", "name"]},
        organization: {only: ["id", "name"]},
        department: {only: ["id", "name"]},
        team: {only: ["id", "name", "field_id"]},
      }
    }
  }
}
