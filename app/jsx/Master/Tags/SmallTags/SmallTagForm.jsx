import SmallTagDetail from "./SmallTagDetail";

export default class TagForm extends BaseMaster.Form {
  constructor(props) {
    super(props);
    this.apiName = "Tag";
    this.defaultData = {parent_id: this.props.parent.id};
    this.objectDetail = SmallTagDetail;
  }

  renderDialogContent = () => {
    let parentTag = this.props.parent || {};

    return(
      <div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput("name", {
              maxLength: 80,
              required: true,
            })}
          </div>
          <div className="col-xs-6">
            <cm.TextField
              disabled={true}
              floatingLabelText={t("master.big_tags.attributes.name")}
              value={parentTag.name}
              className="disabled"
              fullWidth={true}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {this.renderTextInput("notes", {
              maxLength: 600,
              multiLine: true,
              rowsMax: 6,
              textareaStyle: {height: "74%"}}) }
          </div>
        </div>
      </div>
    )
  }
}
