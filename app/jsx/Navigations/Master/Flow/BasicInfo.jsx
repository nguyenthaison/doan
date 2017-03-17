export default class BasicInfo extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name || "",
      stepId: this.props.stepId,
      steps: [],
    }
  }

  getBasicInfo() {
    let basicInfo = {
      name: this.state.name,
      step_id: this.state.stepId,
    };

    return basicInfo;
  }

  componentDidMount() {
    API.Step.getList(this.handleGetListStepCallback, {
      only: ["id", "name"], filter: {active: 1},
      order_by: "id asc",
    });
  }

  handleGetListStepCallback = (status, data) => {
    if (!status) return;

    this.setState({
      steps: data.steps,
    });
  }

  handleChangeInputField = (fieldName, value) => {
    this.setState({
      [fieldName]: value,
    });

    if (this.props.onAdditionChangeData) this.props.onAdditionChangeData();
  }

  handleChangeSelectField = (fieldName, items, selectedId) => {
    this.setState({
      [`${fieldName}Id`]: selectedId,
    });

    if (this.props.onAdditionChangeData) this.props.onAdditionChangeData();
  }

  renderTextInput = (fieldName, options) => {
    return(
      <div className="form-group">
        <cm.TextField
          fieldName={t(`flows.attributes.${fieldName}`)}
          value={this.state[fieldName] || ""}
          onChange={(event, value) => this.handleChangeInputField(fieldName, value)}
          hintText={t(`flows.form.placeholder.${fieldName}`)}
          {...options}
        />
      </div>
    );
  }

  renderSelectField(fieldName, value, items, options) {
    return (
      <cm.SelectField
        fieldName={t(`flows.attributes.${fieldName}`)}
        value={value}
        onChange={(event, key, payload) => this.handleChangeSelectField(fieldName, items, payload)}
        items={items}
        fullWidth={true}
        {...options}
      />
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10 form-group">
          {this.renderTextInput("name", {
            fullWidth: true,
            maxLength: 100,
            required: true}
          )}
          {this.renderSelectField("step", this.state.stepId, this.state.steps)}
        </div>
      </div>
    )
  }
}
