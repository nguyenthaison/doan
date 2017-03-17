import TodoDetail from "./TodoDetail";
import AddCircleOutLine from "material-ui/svg-icons/content/add-circle-outline";
import TodoForm from "./TodoForm";
import NavigationFlow from "../../Master/Flow";
import FlowDetailDialog from "../../Master/Flow/FlowDetailDialog";

export default class TodoList extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      showCreateNewTodoForm: false,
      editingId: null,
      openImportFlowDialog: false,
    };
  }

  get lastDisplayedTodo() {
    let displayedTodos = this.props.displayedTodos;
    let lastDisplayedTodo = displayedTodos[displayedTodos.length - 1];

    return lastDisplayedTodo;
  }

  get lastStepDisplayedTodo() {
    let stepDisplayedTodos = this.getStepDisplayedTodos();
    let lastStepDisplayedTodo = stepDisplayedTodos[stepDisplayedTodos.length - 1];

    return lastStepDisplayedTodo;
  }

  getStepDisplayedTodos() {
    return this.props.displayedTodos.filter(displayedTodo => {
      let stepId = this.props.flowId ? displayedTodo.todo.flow_id :
        displayedTodo.todo.navigation_step_id;
      return stepId === this.props.navigationStep.id
    });
  }

  isShowNextStepButton() {
    return this.isTheEndOfStep() && this.lastStepDisplayedTodo &&
      !this.state.showCreateNewTodoForm && !this.props.isLastStep;
  }

  isTheEndOfStep() {
    if (!this.lastStepDisplayedTodo ||
      this.lastStepDisplayedTodo.todo.category === "text" ||
      this.lastStepDisplayedTodo.selectedNodeId) {
      return true;
    }

    return false;
  }

  isShowImportAndCreateTodoButton() {
    if (this.props.onlyView) {
      return false;
    }

    if (!this.lastDisplayedTodo) {
      return true;
    }

    let lastStepId = this.lastDisplayedTodo.todo.navigation_step_id;

    return this.isTheEndOfStep() &&
      this.props.navigationStep.id >= lastStepId;
  }

  handleClickShowTodoForm = () => {
    this.setState({
      editingId: null,
      showCreateNewTodoForm: true,
    });
  }

  handleCloseTodoForm = () => {
    this.setState({
      showCreateNewTodoForm: false,
    });
  }

  handleCreateTodo = (todo) => {
    this.handleCloseTodoForm();
    this.props.onCreateTodo(todo);
  }

  handleClickNode = (todoId, node) => {
    this.handleCloseTodoForm();
    this.props.onClickNode(todoId, node);
  }

  handleGotoNextStep = () => {
    this.props.onGotoNextStep();
  }

  handleEditTodo = (todoId) => {
    this.setState({
      editingId: todoId,
      showCreateNewTodoForm: false,
    });
  }

  handleUpdateTodo = (todo) => {
    this.handleCloseEditTodoForm();
    this.props.onUpdate(todo);
  }

  handleCloseEditTodoForm = () => {
    this.setState({
      editingId: null,
    });
  }

  handleShowImportFlowDialog = () => {
    this.setState({
      openImportFlowDialog: true,
    });
  }

  handleCloseImportFlowDialog = () => {
    this.setState({
      openImportFlowDialog: false,
    });
  }

  handleShowFlowDetailDialog = (flow) => {
    this.refs.flowDetailDialog.open(flow);
  }

  handleImportFlow = (flow) => {
    this.props.onImport(flow);

    this.refs.flowDetailDialog.close();

    this.setState({
      openImportFlowDialog: false,
    });
  }

  renderNextStepButton() {
    return (
      <span>
        <cm.RaisedButton
          key={this.props.navigationStep.id}
          className="btn-create"
          label={t("navigations.master.form.button.next_step")}
          secondary={true}
          onTouchTap={this.handleGotoNextStep}
          icon={<i className="material-icons">play_circle_outline</i>}
        />
      </span>
    );
  }

  renderImportAndCreateTodoButton() {
    return (
      <span>
        {this.props.flowId ? null :
          <cm.RaisedButton
            className="btn-create"
            label={t("navigations.master.form.button.import_flow_path")}
            secondary={true}
            onTouchTap={this.handleShowImportFlowDialog}
            icon={<i className="material-icons">donut_large</i>}
          />
        }
        <cm.RaisedButton
          className="btn-create"
          label={t("navigations.master.form.button.create_todo")}
          secondary={true}
          onTouchTap={this.handleClickShowTodoForm}
          icon={<AddCircleOutLine />}
        />
    </span>
    );
  }

  renderGroupButton() {
    if (this.state.showCreateNewTodoForm) {
      return null;
    }

    if (!this.isShowImportAndCreateTodoButton() && !this.isShowNextStepButton()) {
      return (
        <div className="direct-text">
          <i className="material-icons">build</i>
          {t("navigations.master.direct_text")}
        </div>
      );
    }

    return (
      <div className="group-button">
        {this.isShowImportAndCreateTodoButton() ?
          this.renderImportAndCreateTodoButton() : null}
        {this.isShowNextStepButton() ? this.renderNextStepButton() : null}
      </div>
    );
  }

  renderTodosList() {
    let displayedTodos = this.props.flowId ? this.props.displayedTodos :
      this.getStepDisplayedTodos();

    return displayedTodos.map(displayedTodo => {
      if (this.state.editingId === displayedTodo.todo.id) {
        return (
          <TodoForm
            onUpdate={this.handleUpdateTodo}
            onClose={this.handleCloseEditTodoForm}
            todo={displayedTodo.todo}
            key={displayedTodo.todo.id} />
        );
      } else {
        return (
          <TodoDetail
            onlyView={this.props.onlyView}
            onDelete={this.props.onDelete}
            onEdit={this.handleEditTodo}
            onClickNode={this.handleClickNode}
            todo={displayedTodo.todo}
            selectedNodeId={displayedTodo.selectedNodeId}
            key={displayedTodo.todo.id}/>
        );
      }
    });
  }

  render() {
    return (
      <div className="todo-list">
        {this.renderTodosList()}
        {this.renderGroupButton()}
        {
          this.state.showCreateNewTodoForm ?
          <TodoForm
            parentDisplayedTodo={this.lastDisplayedTodo}
            navigationId={this.props.navigationId}
            flowId={this.props.flowId}
            onClose={this.handleCloseTodoForm}
            onCreate={this.handleCreateTodo}
            navigationStepId={this.props.navigationStep ? this.props.navigationStep.id : null} />
          : null
        }
        <cm.Dialog
          title={t("flows.detail.title_dialog")}
          icon={<i className="material-icons">donut_large</i>}
          onRequestClose={this.handleCloseImportFlowDialog}
          open={this.state.openImportFlowDialog}
          className="base-master-dialog-index"
          contentClassName="dialog-content"
        >
          <NavigationFlow
            onImport={this.handleImportFlow}
            onShowDetail={this.handleShowFlowDetailDialog}
            onlyImport={true}
            locationState={this.props.locationState}  />
        </cm.Dialog>
        <FlowDetailDialog
          onSubmit={this.handleImportFlow}
          ref="flowDetailDialog" />
      </div>
    );
  }
}
