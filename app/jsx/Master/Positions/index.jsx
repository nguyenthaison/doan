import PositionDetail from "./PositionDetail";
import PositionForm from "./PositionForm";
import EditorFormatListBulleted from "material-ui/svg-icons/editor/format-list-bulleted";

export default class Positions extends BaseMaster.List{
  constructor(props) {
    super(props);
    this.apiName = "Position";
    this.tableName = "positions";
    this.transPath = "master.positions";
    this.iconHeader = "person_pin";
    this.fields = [
      {name: "name", width: 7},
    ];
    this.objectDetail = PositionDetail;
    this.objectForm = PositionForm;
  }
}
