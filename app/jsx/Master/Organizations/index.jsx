import OrganizationDetail from "./OrganizationDetail";
import OrganizationForm from "./OrganizationForm";
import EditorFormatListBulleted from "material-ui/svg-icons/editor/format-list-bulleted";
import Departments from "./Departments";

export default class Organizations extends BaseMaster.List{
  constructor(props) {
    super(props);
    this.apiName = "Organization";
    this.tableName = "organizations";
    this.transPath = "master.organizations";
    this.iconHeader = "location_city";
    this.fields = [
      {name: "name", width: 6},
    ];
    this.objectDetail = OrganizationDetail;
    this.objectForm = OrganizationForm;
    this.child = {
      dialog: Departments,
    }
  }
}
