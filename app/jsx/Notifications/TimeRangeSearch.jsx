import TimeRange from "./Form/TimeRange";

export default class TimeRangeSearch extends BaseComponent {
  constructor(props) {
    super(props);

    let timeRange = this.props.defaultTimeRange;
    let hasPeriod = Object.keys(timeRange).length > 0 ? "true" : "false";

    this.state = {
      timeRange: timeRange,
      hasPeriod: hasPeriod,
    }
  }

  getTimeRange() {
    return this.state.timeRange;
  }

  handleChangeRadioInput = (value) => {
    let newState = update(this.state.hasPeriod, {$set: value});
    if (value === "false") {
      this.setState({
        timeRange: {},
      });
    }
    this.setState({
      hasPeriod: newState,
    });
  }

  handleChangeDateField = (fieldName, value) => {
    let newTimeRange = update(this.state.timeRange, {[fieldName]: {$set: value}});

    this.setState({
      timeRange: newTimeRange,
    });
  }

  render() {
    return(
      <div className="row search-by-time">
        <mui.RadioButtonGroup
          valueSelected={this.state.hasPeriod}
          onChange={(event, value) => this.handleChangeRadioInput(value)}
          name="shipSpeed">
          <mui.RadioButton
            value={"false"}
            label={t("notifications.index.search.no_period")}
          />
          <mui.RadioButton
            value={"true"}
            label={t("notifications.index.search.set_period")}
          />
        </mui.RadioButtonGroup>
        <div className="row time-range-select">
          <TimeRange
            startDate={this.state.timeRange.start_date || null}
            endDate={this.state.timeRange.end_date || null}
            onChange={this.handleChangeDateField}
            required={false}
            disabled={this.state.hasPeriod === "true" ? false : true}/>
        </div>
      </div>
    );
  }
}
