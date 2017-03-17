import MoodBad from "material-ui/svg-icons/social/mood-bad";
import Notifications from "material-ui/svg-icons/social/notifications";

export default class StepBar extends BaseComponent {
  constructor(props) {
    super(props);
  }

  isStepAccessible(navigationStep) {
    let lastDisplayedTodo = this.props.lastDisplayedTodo;

    if (lastDisplayedTodo && navigationStep.id <= lastDisplayedTodo.todo.navigation_step_id) {
      return true;
    }

    return false;
  }

  handleClickStep = (navigationStep) => {
    if (!this.isStepAccessible(navigationStep)) return;

    this.props.onChange(navigationStep);
  }

  handleShowClaims = () => {
    this.props.onShowClaims();
  }

  handleClickBtnHelp = () => {
    this.props.onClickBtnHelp();
  }

  renderStepList() {
    let navigationSteps = this.props.navigationSteps;

    return navigationSteps.map((navigationStep, index) => {
      let stepLabel = "0" + (index + 1) + ".";
      let isSelected = this.props.currentNavigationStep.id === navigationStep.id;

      return (
        <div
          className={(isSelected ? "selected-step" : "") + " pointer"}
          key={navigationStep.id}
          onClick={() => this.handleClickStep(navigationStep)}>
          <div className={(!this.isStepAccessible(navigationStep) ? "prevent-change" : "") + " step"}>
            <p className="label-index">{stepLabel}</p>
            <p className="ellipsis-text step-name" title={navigationStep.step.name}>{navigationStep.step.name}</p>
          </div>
          {navigationSteps.length - 1 !== index ?
            <p className={(isSelected ? "active-arrow-down" : "") + " arrow-down"}></p> : null}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="step-bar">
        <div className="step-bar-title" title={this.props.title}>
          {this.props.title}
        </div>
        <div className="step-list">
          {this.renderStepList()}
          <cm.RaisedButton
            icon={<MoodBad />}
            className="btn-claim"
            primary={true}
            label={t("navigations.master.form.button.claim")}
            onTouchTap={this.handleShowClaims}
          />
          <cm.RaisedButton
            icon={<Notifications />}
            className="btn-claim"
            primary={true}
            label={t("navigations.master.form.button.help")}
            onTouchTap={this.handleClickBtnHelp}
          />
        </div>
      </div>
    );
  }
}
