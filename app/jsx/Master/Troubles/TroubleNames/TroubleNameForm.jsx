import TroubleNameDetail from "./TroubleNameDetail";
import ContentSave from "material-ui/svg-icons/content/save";

export default class TroubleNameForm extends BaseMaster.Form {
  constructor(props) {
    super(props);
    this.apiName = "TroubleName";
    this.objectDetail = TroubleNameDetail;
  }

  renderButton() {
    return(
      <div>
        <cm.RaisedButton
          style={{minWidth: "110px"}}
          label={t("common.save")}
          primary={true}
          onClick={this.handleClickSubmit}
        />
      </div>
    )
  }

  renderDialogContent() {
    return(
      <div>
        {this.renderTextInput("name", {
          maxLength: 80,
          })}
      </div>
    )
  }
}
