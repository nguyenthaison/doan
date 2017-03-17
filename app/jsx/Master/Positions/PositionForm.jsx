import NavigationClose from "material-ui/svg-icons/navigation/close";
import ContentSave from "material-ui/svg-icons/content/save";
import PositionDetail from "./PositionDetail";

export default class PositionForm extends BaseMaster.Form {
  constructor(props) {
    super(props);
    this.apiName = "Position";
    this.objectDetail = PositionDetail;
  }

  renderDialogContent = () => {
    return(
      <div>
        {this.renderTextInput("name", {
          maxLength: 80,
          required: true,
        })}
        {this.renderTextInput("notes", {
          maxLength: 600,
          multiLine: true,
          rowsMax: 6,
          textareaStyle: {height: "74%"}}) }
      </div>
    )
  }
}
