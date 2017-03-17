import LineForm from "./LineForm";
import LineDetail from "./LineDetail";

export default class Lines extends BaseMaster.ListDialog {
  constructor(props) {
    super(props);
    this.apiName = "Line";
    this.tableName = "lines";
    this.transPath = "master.lines";
    this.fields = [
      {name: "code", width: 2},
      {name: "name", width: 3},
      {name: "free_dial_number", width: 2},
    ];
    this.objectDetail = LineDetail;
    this.objectForm = LineForm;
  }

  getOptions() {
    return {
      filter: {
        client_id: this.parent ? this.parent.id : null,
      },
      include: {
        line_troubles: {
          include: ["big_trouble", "medium_trouble", "small_trouble", "tiny_trouble"],
        },
      },
    }
  }
}
