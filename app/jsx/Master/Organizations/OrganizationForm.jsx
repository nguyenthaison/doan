import OrganizationDetail from "./OrganizationDetail";

export default class OrganizationForm extends BaseMaster.Form {
  constructor(props) {
    super(props);
    this.apiName = "Organization";
    this.objectDetail = OrganizationDetail;
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
