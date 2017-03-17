import TeamDetail from "./TeamDetail";
import TeamForm from "./TeamForm";

export default class Teams extends BaseMaster.ListDialog {
  constructor(props) {
    super(props);
    this.apiName = "Team";
    this.tableName = "teams";
    this.transPath = "master.teams";
    this.fields = [
      {name: "name", width: 7},
    ];
    this.objectDetail = TeamDetail;
    this.objectForm = TeamForm;
  }

  getOptions() {
    return {
      filter: {
        department_id: this.parent ? this.parent.id : null,
      },
    }
  }
}
