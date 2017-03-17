import CompanyDetail from "./CompanyDetail";
import CompanyForm from "./CompanyForm";
import EditorFormatListBulleted from "material-ui/svg-icons/editor/format-list-bulleted";
import Field from "./Field";

export default class Companies extends BaseMaster.List {
  constructor(props) {
    super(props);
    this.apiName = "Company";
    this.tableName = "companies";
    this.transPath = "pms.companies";
    this.iconHeader = "subject";
    this.fields = [
       {name: "name", width: 2},
       {name: "field_num", width: 2},
       {name: "user_num", width: 2},
     ];
    this.objectDetail = CompanyDetail;
    this.objectForm = CompanyForm;

    this.child = {
      dialog: Field,
    }
  }

  getOptions() {
    return {
      methods: ["field_num", "user_num"],
      include: {
        fields: {
          only: ["id", "contract_start_date", "contract_end_date"],
          methods: ["field_name", "user_num"],
        }
      }
    }
  }
}
