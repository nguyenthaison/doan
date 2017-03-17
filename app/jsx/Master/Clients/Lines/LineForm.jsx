import TroubleList from "./TroubleList";
import LineDetail from "./LineDetail";
import ContentSave from "material-ui/svg-icons/content/save";

const styles = {
  note: {
    height: "74%",
  }
}

export default class LineForm extends BaseMaster.Form {
  constructor(props) {
    super(props);
    this.apiName = "Line";
    this.defaultData = {client_id: this.props.parent.id};
    this.objectDetail = LineDetail;
  }

  getDataForSubmit() {
    return update(this.state.data, {
      line_troubles: {$set: this.refs.troubleList.getLineTroubles()}
    });
  }

  renderDialogContent = () => {
    return(
      <div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput("code",
              {maxLength: 10, required: true})}
          </div>
          <div className="col-xs-6">
            <cm.TextField
              name="client_name"
              fullWidth={true}
              disabled={true}
              fieldName={t("master.lines.attributes.client_name")}
              value={this.props.parent.name}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput("name",
              {maxLength: 80, required: true})}
          </div>
          <div className="col-xs-6">
            {this.renderTextInput("name_kana",
              {required: true})}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput("free_dial_number",
              {maxLength: 80, filter: "phone_number"})}
          </div>
          <div className="col-xs-6">
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <i className="material-icons form-icon">warning</i>
            <span className="label-name">{t("master.lines.form.troubles")}</span>
            <div className="troubles">
              <TroubleList ref="troubleList"
                lineTroubles={this.state.data.line_troubles} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {this.renderTextInput("notes", {
              maxLength: 600,
              multiLine: true,
              rowsMax: 6,
              textareaStyle: styles.note,
            })}
          </div>
        </div>
      </div>
    )
  }
}
