import NavigationClose from "material-ui/svg-icons/navigation/close";
import ContentSave from "material-ui/svg-icons/content/save";
import ClientDetail from "./ClientDetail";

export default class ClientForm extends BaseMaster.Form {
  constructor(props) {
    super(props);
    this.apiName = "Client";
    this.objectDetail = ClientDetail;
  }

  renderDialogContent = () => {
    return(
      <div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput("code", {
              maxLength: 10,
              required: true,
            })}
          </div>
          <div className="col-xs-6">
            {this.renderTextInput("short_name", {
                maxLength: 3,
                required: true,
                filter: "alphanumberic",
                transformation: "uppercase"
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput("name", {
              maxLength: 80,
              required: true
            })}
          </div>
          <div className="col-xs-6">
            {this.renderTextInput("name_kana", {
              maxLength: 80,
              required: true,
              })}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput("address", {
              maxLength: 300,
            })}
          </div>
          <div className="col-xs-6">
            {this.renderTextInput("phone_number", {
              maxLength: 40,
              filter: "phone_number"
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {this.renderTextInput("notes", {
              maxLength: 600,
              multiLine: true,
              rows: 1,
              rowsMax: 6,
              textareaStyle: {height: "74%"}
            })}
          </div>
        </div>
      </div>
    )
  }
}
