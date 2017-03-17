import ClientDetail from "./ClientDetail";
import ClientForm from "./ClientForm";
import EditorFormatListBulleted from "material-ui/svg-icons/editor/format-list-bulleted";
import Lines from "./Lines";

export default class Clients extends BaseMaster.List {
  constructor(props) {
    super(props);
    this.apiName = "Client";
    this.tableName = "clients";
    this.transPath = "master.clients";
    this.iconHeader = "people";
    this.fields = [
      {name: "code", width: 2},
      {name: "short_name", width: 1},
      {name: "name", width: 3},
    ];
    this.objectDetail = ClientDetail;
    this.objectForm = ClientForm;

    this.child = {
      dialog: Lines,
    }
  }
}
