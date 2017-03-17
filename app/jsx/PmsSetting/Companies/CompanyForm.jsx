import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ContentSave from 'material-ui/svg-icons/content/save';
import CompanyDetail from "./CompanyDetail";

export default class CompanyForm extends BaseMaster.Form {
  constructor(props) {
    super(props);
    this.apiName = "Company";
    this.objectDetail = CompanyDetail;
  }

  renderDialogContent() {
    return(
      <div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput('name', {
              maxLength: 100,
              required: true,
            })}
          </div>
          <div className="col-xs-6">
            {this.renderTextInput('name_kana', {
              maxLength: 150,
              required: true,
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput('postal_code', {
              maxLength: 20,
              required: true,
              filter: "phone_number",
            })}
          </div>
          <div className="col-xs-6">
            {this.renderTextInput('address', {
              maxLength: 250,
              required: true,
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput('phone_number', {
              maxLength: 20,
              required: true,
              filter: "phone_number",
            })}
          </div>
          <div className="col-xs-6">
            {this.renderTextInput('fax', {
              maxLength: 20,
              filter: "phone_number",
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput('billing_address_zip', {
              maxLength: 20,
              filter: "phone_number",
            })}
          </div>
          <div className="col-xs-6">
            {this.renderTextInput('billing_address', {
              maxLength: 250,
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput('phone_number_billing', {
              maxLength: 20,
              filter: "phone_number",
            })}
          </div>
          <div className="col-xs-6">
            {this.renderTextInput('fax_billing', {
              maxLength: 20,
              filter: "phone_number",
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput('name_PIC', {
              maxLength: 40,
              required: true,
            })}
          </div>
          <div className="col-xs-6">
            {this.renderTextInput('name_PIC_billing', {
              maxLength: 40,
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput('name_kana_PIC', {
              maxLength: 40,
            })}
          </div>
          <div className="col-xs-6">
            {this.renderTextInput('name_kana_PIC_billing', {
              maxLength: 40,
            })}
          </div>
        </div>
        {this.renderTextInput('notes', {
          maxLength: 600,
          multiLine: true,
          rowsMax: 6,
          textareaStyle: {height: "74%"}}) }
      </div>
    )
  }
}
