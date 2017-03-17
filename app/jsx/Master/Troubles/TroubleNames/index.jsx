import TroubleNameDetail from "./TroubleNameDetail";
import TroubleNameForm from "./TroubleNameForm";
export default class TroubleNames extends BaseMaster.List{
  constructor(props) {
    super(props);
    this.apiName = "TroubleName";
    this.tableName = "trouble_names";
    this.transPath = "master.trouble_names";
    this.iconHeader = "warning";
    this.fields = [
      {name: "key", width: 3, transform: (item) => {return t(`master.trouble_names.trouble_keys.${item.key}`)}},
      {name: "name", width: 4},
    ];
    this.objectDetail = TroubleNameDetail;
    this.objectForm = TroubleNameForm;
    this.noActionHeader = true;
  }
}
