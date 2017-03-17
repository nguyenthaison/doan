import ListHeader from "../../Master/BaseMaster/ListHeader";

export default class StepConfig extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      steps: [],
      errors: {},
    };
  }

  componentDidMount() {
    this.setToolBar(t("navigations.header_title"));
    API.Step.getList(this.handleGetListStepCallback, {
      only: ["id", "name", "active"], order_by: "id",
    });
  }

  handleGetListStepCallback = (status, data) => {
    if (!status) return;

    this.setState({
      steps: data.steps,
    });
  }

  handleChangeActiveStep = (index) => {
    let step = this.state.steps[index];
    this.updateSteps("active", !step.active, index);
  }

  handleChangeInput = (value, index) => {
    this.updateSteps("name", value, index);
  }

  handleUpdateAllStep = () => {
    let steps = this.state.steps;

    API.Step.updateAllStep(this.handleUpdateAllStepCallback, steps);
  }

  handleUpdateAllStepCallback = (status, data) => {
    if (status) {
      Helper.showMessage(t("common.message.updated_success"));

      this.setState({
        errors: {},
      });
    } else {
      if (data.no_active_step) {
        Helper.showErrors(t("navigations.no_active_step"));
      } else {
        this.setState({
          errors: data.errors,
        });
      }
    }
  }

  updateSteps(attribute, value, index) {
    let newSteps = update(this.state.steps,{
      [index]: {
          [attribute]: {$set: value}
      }
    });

    this.setState({
      steps: newSteps,
    });
  }

  renderStepList() {
    let steps = this.state.steps;
    let errors = this.state.errors;

    return steps.map((step, index) => {
      let stepLabel = " 0" + (index + 1);

      return (
        <div className="step" key={step.id}>
          <mui.Badge
            className={(step.active ? "active-step" : "in-active-step") + " step-position-badge"}
            badgeContent={stepLabel}
          />
        <div className="step-field">
          <span className="step-label in-active-step">{t("navigations.master.step") + stepLabel}</span>
          <cm.TextField
            maxLength={100}
            fullWidth={true}
            disabled={!step.active}
            errorText={errors[index] ? errors[index]["name"] : null}
            name={"name"}
            onChange={(event, value) => this.handleChangeInput(value, index)}
            value={step.name}
          />
        </div>
          <mui.Checkbox
            onClick={() => this.handleChangeActiveStep(index)}
            checked={!step.active}
            className="active-step-checkbox"
            label={t("navigations.master.off")} />
        </div>
      );
    });
  }

  render() {
    let icon = <i className="material-icons icon-header">view_list</i>;

    return (
      <div className="base-master-index step-list-config">
        <ListHeader
          icon={icon}
          title={t("navigations.master.stepConfig")}/>
        <div className="body-index">
          <span className="title-guide">
            {t("navigations.master.title_guide")}
          </span>
          <div className="list-step">
            {this.renderStepList()}
          </div>
          <cm.RaisedButton
            onClick={this.handleUpdateAllStep}
            primary={true}
            label={t("common.save")}
          />
        </div>
      </div>
    );
  }
}
