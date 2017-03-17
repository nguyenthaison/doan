export default class ContractPeriod extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleSelectDatePicker = (date, fieldName) => {
    date = date.toString();
    this.props.onChange(fieldName, date);
  }

  handleRemoveData = (e, fieldName) => {
    this.props.onChange(fieldName);
  }

  renderClearSearchIcon(fieldName) {
    return (
      <i
        className="material-icons remove-search-icon pointer"
        onClick={(event) => this.handleRemoveData(event, fieldName)}>cancel
      </i>
    );
  }

  renderDatePicker(fieldName, textAfter, value) {
    let field = this.props.data;

    return (
      <div>
        <div className="wp-date-picker">
          <div>
            <div className="form-section-title">
              {t("pms.fields.period")}
            </div>
          </div>
          <div className="select-date">
            <mui.DatePicker
              name={fieldName}
              className="custom-select-date"
              fullWidth={true}
              autoOk={true}
              value={field[fieldName] ? new Date(field[fieldName]) : null}
              cancelLabel={t("common.cancel")}
              mode="landscape"
              onChange={(event, date) => this.handleSelectDatePicker(date, fieldName)}
            />
            <div className="icon-delete">
              {field[fieldName] ? this.renderClearSearchIcon(fieldName) : ""}
            </div>
            <div className="text-after">
              {t(`pms.fields.${textAfter}`)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    let errors = this.props.errors;

    return (
      <div>
        <div className="row padding-bottom-30px">
          <div>
            <div className="col-xs-6">
              {this.renderDatePicker("contract_start_date", "from")}
              <div className="error-message">
                {errors ? errors["contract_start_date"] : ""}
              </div>
            </div>
            <div className="col-xs-6">
              {this.renderDatePicker("contract_end_date", "to")}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
