import ListHeader from "../../../Master/BaseMaster/ListHeader";
import MetaData from "./MetaData";
import NavigationContent from "../../NavigationContent";
import ActionDelete from "material-ui/svg-icons/action/delete";

const steppers = {
  metaData: 1,
  todos: 2,
}

export default class Form extends PageComponent {
  constructor(props) {
    super(props);

    let action = this.props.location.pathname.split("/").pop();
    this.state = {
      currentStepper: steppers.metaData,
      flow: this.props.params.id ? null : {id: null},
      canMoveToTodos: !!this.props.params.id && action !== "clone",
    }
  }

  getOptions() {
    let include = {
      client_flow_lines: {
        include: {
          client: {only: ["id", "short_name"]},
          line: {only: ["id", "name"]},
        }
      },
      flow_tags: {
        include: {
          tag: {only: ["id", "name"]},
          parent_tag: {only: ["id", "name"]},
        }
      },
      big_trouble: {only: ["id", "name"]},
      medium_trouble: {only: ["id", "name"]},
      small_trouble: {only: ["id", "name"]},
      tiny_trouble: {only: ["id", "name"]},
      todos: {include: {nodes: {}, parent_todo: {}, attachments: {}}},
    };

    return {
      include: JSON.stringify(include),
    }
  }

  componentDidMount() {
    this.setToolBar(t("navigations.header_title"));

    let flowId = this.props.params.id;
    if (flowId) {
      API.Flow.get(this.handleGetFlowCallback, flowId, this.getOptions());
    }
  }

  handleGetFlowCallback = (status, data) => {
    if (status) {
      let action = this.props.location.pathname.split("/").pop();
      if (action === "clone") {
        this.originalFlowId = data.flow.id;
        data.flow.id = null;
      }

      this.setState({
        flow: data.flow,
      });
    } else {
      Helper.showErrors(data);
    }
  }

  handleClickStepper = (stepperId) => {
    if (!this.state.canMoveToTodos) return;

    this.setState({
      currentStepper: stepperId,
    });
  }

  handleSaveMetadata = (flow) => {
    if (this.state.flow.id) {
      API.Flow.update(this.handleSaveCallback, flow);
    } else {
      let action = this.props.location.pathname.split("/").pop();
      let options = {};

      if (action === "clone") {
        options = {clone: true, original_flow_id: this.originalFlowId};
      }
      API.Flow.create(this.handleSaveCallback, flow, options);
    }
  }

  handleSaveCallback = (status, data) => {
    if (status) {
      this.setState({
        flow: data.flow,
        currentStepper: steppers.todos,
        canMoveToTodos: true,
      });
    }
  }

  handleUpdate = (flow) => {
    this.setState({
      flow: flow,
    });
  }

  handleChangeData = () => {
    this.setState({
      canMoveToTodos: false,
    });
  }

  handlePublish = () => {
    Helper.transitionTo("/masterNavigation/flows");
  }

  handleClickDelete = () => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.delete"),
      this.handleConfirmDelete);
  }

  handleConfirmDelete = () => {
    let flowId = this.props.params.id;
    API.Flow.delete(this.handleDeleteCallback, flowId);
  }

  handleDeleteCallback = (status, data) => {
    if (!status) return;
    Helper.showMessage(t("common.message.deleted_success"));
    Helper.transitionTo("/masterNavigation/flows");
  }

  renderTabs() {
    let currentStepper = this.state.currentStepper;

    return (
      <div className="config">
        <div className="config-steps">
          <div className={`config-step pointer ${this.state.currentStepper === steppers.metaData ?
            "selected-stepper" : null}`}
            onClick={() => this.handleClickStepper(steppers.metaData)}>
            <span>
              {t("flows.config")}
            </span>
          </div>
          <div className={`config-step ${this.state.currentStepper === steppers.todos ?
            "selected-stepper" : ""} ${this.state.canMoveToTodos ? "pointer" : ""}`}
            onClick={() => this.handleClickStepper(steppers.todos)}>
            <span>
              {t("flows.todos")}
            </span>
          </div>
        </div>
      </div>
    );
  }

  renderTodosList() {
    return (
        <NavigationContent
          ref="navigationContent"
          showStepBar={false}
          flow={this.state.flow}
          onUpdate={this.handleUpdate}
          defaultNavigationStep={this.state.flow}
        />
    );
  }

  render() {
    if (!this.state.flow) return null;

    let backButton = (
      <cm.RaisedButton
        className="btn-create"
        label={t("common.cancel")}
        secondary={true}
        onTouchTap={() => Helper.transitionTo("/masterNavigation/flows")}
      />
    );

    let finishButton = (
      <cm.RaisedButton
        className="btn-create"
        label={t("common.done")}
        secondary={true}
        onTouchTap={this.handlePublish}
      />
    );

    let deleteButton = (
      <cm.RaisedButton
        icon={<ActionDelete />}
        className="btn-delete"
        label={t("common.delete")}
        onClick={this.handleClickDelete}
      />
    )

    return (
      <div className="base-master-index flow-form">
        <ListHeader
          icon={<i className="material-icons icon-header">donut_large</i>}
          title={t("flows.title")}
        >
          {this.props.params.id ? backButton : null}
          {this.props.params.id ? deleteButton : null}
          {this.state.canMoveToTodos ? finishButton : null}
        </ListHeader>

        <div className="flow-setting">
          {this.renderTabs()}
          <div className="right-content">
            {this.state.currentStepper === steppers.metaData ?
              <MetaData
                flow={this.state.flow}
                onChangeData={this.handleChangeData}
                onSave={this.handleSaveMetadata}
              /> : null}
            {this.state.currentStepper === steppers.todos ?
              this.renderTodosList() : null}
          </div>
        </div>
      </div>
    );
  }
}
