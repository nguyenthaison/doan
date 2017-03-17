const radioOptions = {
  publishNow: "publish_now",
  inSpecificDay: "publish_in_specific_day",
}

export default class PublishDialog extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selectedRadioOption: this.defaultRadioOption,
      publishSpecificDate: this.props.publishDate,
    }

    this.publishDate = new Date();
  }

  open = () => {
    this.setState({
      open: true,
    });
  }

  getPublishDate() {
    return this.publishDate;
  }

  get defaultRadioOption() {
    return this.props.publishDate ? radioOptions.inSpecificDay : radioOptions.publishNow
  }

  handleClose = () => {
    this.setState({
      open: false,
      selectedRadioOption: this.defaultRadioOption,
    });
  }

  handleChangeRadioInput = (event, value) => {
    let publishDate;
    switch(value) {
      case radioOptions.publishNow:
        publishDate = new Date();
        break;
      case radioOptions.inSpecificDay:
        publishDate = this.state.publishSpecificDate;
        break;
    }
    this.publishDate = publishDate;

    this.setState({
      selectedRadioOption: value,
    });
  }

  handleSelectDatePicker = (event, date) => {
    this.publishDate = date;

    this.setState({
      publishSpecificDate: date,
    });
  }

  handleSelectTimePicker = (event, time) => {
    this.publishDate.setHours(time.getHours());
    this.publishDate.setMinutes(time.getMinutes());
  }

  handleClickSubmit = () => {
    this.props.onSavePublishOption(this.state.selectedRadioOption);
    this.setState({
      open: false,
    });
  }

  renderRadioOptions() {
    return (
      <mui.RadioButtonGroup
        valueSelected={this.state.selectedRadioOption}
        onChange={this.handleChangeRadioInput}
        name="publish">
        <mui.RadioButton
          value={radioOptions.publishNow}
          label={t("navigations.publish_dialog.publish_now")}
        />
        <mui.RadioButton
          value={radioOptions.inSpecificDay}
          label={t("navigations.publish_dialog.publish_in_specific_day")}
        />
      </mui.RadioButtonGroup>
    );
  }

  renderDialogContent() {
    return (
      <div>
        <div className="header-title">{t("navigations.publish_dialog.header_title")}</div>
        {this.renderRadioOptions()}
        <div className="date-picker">
          <div className="date-title">{t("navigations.publish_dialog.time")}</div>
          <mui.DatePicker
            className="publish-date-picker"
            disabled={this.state.selectedRadioOption !== radioOptions.inSpecificDay}
            autoOk={true}
            name="publish-date"
            value={this.state.publishSpecificDate ? new Date(this.state.publishSpecificDate) : null}
            cancelLabel={t("common.cancel")}
            mode="landscape"
            onChange={this.handleSelectDatePicker}
          />
          <mui.TimePicker
            name="publish-time"
            disabled={this.state.selectedRadioOption !== radioOptions.inSpecificDay || !this.state.publishSpecificDate}
            format="24hr"
            autoOk={true}
            cancelLabel={t("common.cancel")}
            value={this.state.publishSpecificDate ? new Date(this.state.publishSpecificDate) : null}
            onChange={this.handleSelectTimePicker}
          />
        </div>
      </div>
    );
  }

  render() {
    let actionButtons = (
      <div>
        <cm.RaisedButton
          style={{minWidth: "110px"}}
          className="btn-mr5"
          label={t("common.cancel")}
          onClick={this.handleClose}
          secondary={true}
        />
        <cm.RaisedButton
          style={{minWidth: "110px"}}
          label={t("common.submit")}
          onClick={this.handleClickSubmit}
          primary={true}
          disabled={!this.publishDate}
        />
      </div>
    );

    return (
      <cm.Dialog
        title={t("navigations.publish_dialog.title")}
        open={this.state.open}
        onRequestClose={this.handleClose}
        actions={actionButtons}
        className="publish-navigation-dialog"
      >
        {this.renderDialogContent()}
      </cm.Dialog>
    );
  }
}
