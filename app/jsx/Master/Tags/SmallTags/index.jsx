import SmallTagDetail from "./SmallTagDetail";
import SmallTagForm from "./SmallTagForm";

export default class Tags extends BaseMaster.ListDialog {
  constructor(props) {
    super(props);
    this.apiName = "Tag";
    this.tableName = "tags";
    this.transPath = "master.small_tags";
    this.fields = [
      {name: "name", width: 7},
    ];
    this.objectDetail = SmallTagDetail;
    this.objectForm = SmallTagForm;
    this.headerType = "secondary";
    this.noHeaderTitle = true;
    this.sortable = true;
  }

  getOptions() {
    return {
      filter: {
        parent_id: this.parent ? this.parent.id : null,
      },
    }
  }
}
