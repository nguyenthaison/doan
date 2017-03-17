import EventNote from 'material-ui/svg-icons/notification/event-note';
import DateRange from 'material-ui/svg-icons/action/date-range';
import TimeRange from "./TimeRange";

export default class BasicInfo extends BaseComponent {
  constructor(props) {
    super(props);

    let filterAttributes = ["title", "content", "priority", "start_date", "end_date"];
    let basicInfo = this.filterObjectKeys(filterAttributes, this.props.notification);

    this.state = {
      basicInfo: basicInfo || {},
    }
  }

  getBasicInfo() {
    return this.state.basicInfo;
  }

  handleChangeInputField = (fieldName, value) => {
    let newState = update(this.state.basicInfo, {[fieldName]: {$set: value}});

    this.setState({basicInfo: newState});
  }

  renderLabel = (fieldName, required = false) => {
    let requiredText = required ? <div className="required">{t("common.required")}</div> : "";
    return(
      <div className="form-section-title">
        {t(`notifications.attributes.${fieldName}`)}
        {requiredText}
      </div>
    );
  }

  renderTextInput = (fieldName, options) => {
    return(
      <div className="form-group">
        <cm.TextField
          fieldName={t(`notifications.attributes.${fieldName}`)}
          onChange={(event, value) => this.handleChangeInputField(fieldName, value)}
          value={this.state.basicInfo[fieldName] || ""}
          hintText={t(`notifications.form.placeholder.${fieldName}`)}
          {...options}
        />
      </div>
    );
  }

  renderPriority = () => {
    let priorities = ["low", "medium", "high"];

    return priorities.map((priority, index) => {
      return(
        <mui.RadioButton
          className="priority-item"
          key={index}
          value={priority}
          label={t(`notifications.priorities.${priority}`)}
        />
      );
    });
  }

  render() {
    return(
      <div>
        <div className="row">
          <div className="col-md-6">
            {this.renderTextInput("title", {fullWidth: true, maxLength: 100, required: true, counting: true})}
          </div>
          <div className="col-md-4">
            <div>
              {this.renderLabel("priority", true)}
            </div>
            <div className="list-priority-faq">
              <mui.RadioButtonGroup
                defaultSelected={this.state.basicInfo.priority}
                className="priority-container"
                name="priority"
                onChange={(event, value) => this.handleChangeInputField("priority", value)}
              >
                {this.renderPriority()}
              </mui.RadioButtonGroup>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 form-group">
            {this.renderTextInput("content",
              {fullWidth: true, multiLine: true, rowsMax: 10, maxLength: 2000, required: true, counting: true}
            )}
          </div>
        </div>
        <div className="row">
          <div className="row time-label">
            <EventNote className="form-section-icon" style={{color: theme.secondaryColor}}/>
            {this.renderLabel("period")}
          </div>
          <TimeRange
            startDate={this.state.basicInfo.start_date}
            endDate={this.state.basicInfo.end_date}
            onChange={this.handleChangeInputField}
          />
        </div>
      </div>
    );
  }
}
