export default class TimeRange extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleSelectDatePicker = (event, date, fieldName) => {
    this.props.onChange(fieldName, date.toDateString());
  }

  renderLabel(fieldName, required = false) {
    let requiredText = required ? <div className="required">{t("common.required")}</div> : "";
    return(
      <div className="form-section-title">
        {t(`notifications.attributes.${fieldName}`)}
        {requiredText}
      </div>
    );
  }

  renderDatePicker(fieldName, textAfter, required, value) {
    return (
      <div className="col-md-4">
        <div className="row">
          {this.renderLabel(fieldName, required)}
        </div>
        <div className="row">
          <div className="col-md-9 select-date">
            <mui.DatePicker
              disabled={this.props.disabled}
              name={fieldName}
              className="custom-select-date"
              autoOk={true}
              value={value ? new Date(value) : null}
              cancelLabel={t("common.cancel")}
              mode="landscape"
              onChange={(event, date) => this.handleSelectDatePicker(event, date, fieldName)}
            />
          </div>
          <div className="col-md-2 text-after">
            {t(`notifications.form.text_after.${textAfter}`)}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="row">
        {this.renderDatePicker("start_date", "from", this.props.required, this.props.startDate)}
        {this.renderDatePicker("end_date", "to", this.props.required, this.props.endDate)}
      </div>
    );
  }
}

TimeRange.defaultProps = {
  disabled: false,
  required: true,
};
