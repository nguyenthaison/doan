import DepartmentDetail from "./DepartmentDetail";
import DepartmentForm from "./DepartmentForm";
import EditorFormatListBulleted from "material-ui/svg-icons/editor/format-list-bulleted";
import Teams from "./Teams";

export default class Departments extends BaseMaster.ListDialog {
  constructor(props) {
    super(props);
    this.apiName = "Department";
    this.tableName = "departments";
    this.transPath = "master.departments";
    this.fields = [
      {name: "name", width: 6},
    ];
    this.objectDetail = DepartmentDetail;
    this.objectForm = DepartmentForm;
    this.childName = "teams";
    this.child = {
      dialog: Teams,
    }
  }

  getOptions() {
    return {
      filter: {
        organization_id: this.parent ? this.parent.id : null,
      },
    }
  }

  getAdditionDataForChildren() {
    return {
      organization: this.parent,
    }
  }
}
