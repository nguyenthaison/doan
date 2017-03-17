export default class Step extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      steps: [],
      checkedSteps: this.props.defaultCheckedSteps || [],
    };
  }

  componentDidMount() {
    API.Step.getList(this.handleGetListStepCallback, {only: ["id", "name"], order_by: "id asc"});
  }

  getCheckedSteps() {
    return this.state.checkedSteps;
  }

  findIndexInCheckedSteps(step) {
    return this.state.checkedSteps.findIndex(checkedStep =>
      checkedStep.id === step.id)
  }

  handleGetListStepCallback = (status, data) => {
    if (!status) return;

    this.setState({
      steps: data.steps,
    });
  }

  handleChangeStep = (step) => {
    let checkedSteps = this.state.checkedSteps;
    let index = this.findIndexInCheckedSteps(step);

    if (index != -1) {
      checkedSteps.splice(index, 1);
    } else {
      checkedSteps.push(step);
    }

    this.setState({
      checkedSteps: checkedSteps,
    });
  }

  render() {
    return (
      <div className="col-md-10 form-group">
        <div className="clearfix"></div>
        <div className="row team-list">
          {this.state.steps.map((step) => {
            let isChecked = this.findIndexInCheckedSteps(step) != -1;
            return (
              <div key={step.id} className="col-md-4">
                <mui.Checkbox
                  onClick={() => this.handleChangeStep(step)}
                  label={step.name}
                  title={step.name}
                  labelStyle={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}
                  style={{display: "block"}}
                  checked={isChecked}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
