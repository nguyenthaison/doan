import TagDetail from "./TagDetail";

export default class TagForm extends BaseMaster.Form {
  constructor(props) {
    super(props);
    this.apiName = "Tag";
    this.objectDetail = TagDetail;
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
