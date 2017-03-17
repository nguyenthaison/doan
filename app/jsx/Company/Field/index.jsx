import FieldDetail from "./FieldDetail";
import FieldForm from "./FieldForm";

export default class Field extends BaseMaster.List {
  constructor(props) {
    super(props);
    this.apiName = "Field";
    this.tableName = "fields";
    this.transPath = "pms.fields";
    this.iconHeader = "share";
    this.noActionHeader = true;
    this.fields = [
      {name: "name", width: 2},
      {name: "team_num", width: 1},
      {name: "user_num", width: 1},
      {name: "contract_period", width: 3, transform: (item) => {
        return Helper.formatDateRange(item["contract_start_date"], item["contract_end_date"])
      }},
    ];
    this.objectDetail = FieldDetail;
    this.objectForm = FieldForm;
  }

  getOptions() {
    return {
      methods: ["team_num", "user_num"],
      include: {
        teams: {
          only: ["id", "name"],
          include: {
            department: {
              only: ["id", "name"],
              include: {
                organization: {only: ["id", "name"]},
              }
            },
          }
        }
      }
    }
  }
}
