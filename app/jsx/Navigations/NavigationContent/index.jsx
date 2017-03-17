import StepBar from "./StepBar";
import TodoList from "./Todo";
import ClaimDialog from "./ClaimDialog";
import HelpDialog from "./HelpDialog";

const TODO_CATEGORIES = {
  text: "text",
  flow: "flow",
}

export default class NavigationContent extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedNavigationStep: this.props.defaultNavigationStep,
      displayedTodos: [],
    };
  }

  get container() {
    return this.props.navigation || this.props.flow;
  }

  get todos() {
    let navigation = this.props.navigation;
    let flow = this.props.flow;

    return navigation ? navigation.todos : (flow ? flow.todos : null);
  }

  componentDidMount() {
    let firstTodo = this.todos ? this.todos[0] : null;

    if (firstTodo) {
      this.addDisplayedTodoWithChildren(firstTodo);
    }
  }

  getChildrenDisplayedTodos(todo) {
    let childrenDisplayedTodos = [];

    while (todo && todo.category !== TODO_CATEGORIES.flow) {
      let childTodo = this.todos.find(_todo => {
        return todo.id === _todo.parent_todo_id;
      });

      if (childTodo) {
        childrenDisplayedTodos.push({
          todo: childTodo,
        });
      }

      todo = childTodo;
    }

    return childrenDisplayedTodos;
  }

  addDisplayedTodoWithChildren(todo) {
    let newDisplayedTodos = [];

    newDisplayedTodos.push({
      todo: todo,
    });

    newDisplayedTodos = newDisplayedTodos.concat(this.getChildrenDisplayedTodos(todo));

    let displayedTodos = update(this.state.displayedTodos, {
      $push: newDisplayedTodos,
    });

    this.setState({
      displayedTodos: displayedTodos,
    });
  }

  findDisplayedTodoIndex(todoId) {
    let index = this.state.displayedTodos.findIndex(displayedTodo => {
      return displayedTodo.todo.id === todoId;
    });

    return index;
  }

  findIndexOfTodo(todoId) {
    let index = this.todos.findIndex(_todo => {
        return _todo.id === todoId;
    });

    return index;
  }

  clearAllDisplayedTodoAfterTodo(todoId) {
    let index = this.findDisplayedTodoIndex(todoId);
    let displayedTodos = update(this.state.displayedTodos, {
      $splice: [[index + 1]]
    });

    return displayedTodos;
  }

  updateDisplayedTodos(todo) {
    let displayedTodos = this.state.displayedTodos;
    let index = this.findDisplayedTodoIndex(todo.id);
    let oldSelectedNodeId = displayedTodos[index].selectedNodeId;

    let doesOldSelectedNodeIdExist = todo.nodes.find(node => {
      return oldSelectedNodeId === node.id;
    });

    if (!doesOldSelectedNodeIdExist && todo.category === TODO_CATEGORIES.flow) {
      displayedTodos = this.clearAllDisplayedTodoAfterTodo(todo.id);
    }

    displayedTodos = update(displayedTodos, {
      [index]: {todo: {$set: todo}},
    });

    this.setState({
      displayedTodos: displayedTodos,
    });
  }

  handleChangeStep = (navigationStep) => {
    this.setState({
      selectedNavigationStep: navigationStep,
    });
  }

  handleChangeTodoNode = (todoId, node) => {
    let displayedTodos =  this.clearAllDisplayedTodoAfterTodo(todoId);
    let index = this.findDisplayedTodoIndex(todoId);

    displayedTodos = update(displayedTodos, {
      [index]: {
        selectedNodeId: {$set: node.id}
      }
    });
    App.selectedNode = node;

    this.setState({
      displayedTodos: displayedTodos,
    }, () => {
      let childTodo = this.todos.find((todo) => {
       return todo.node_id === node.id;
      });

      if (childTodo) {
        this.addDisplayedTodoWithChildren(childTodo);
      }
    });
  }

  handleGotoNextStep = () => {
    let index = this.props.navigation.navigation_steps.findIndex(navigationStep => {
      return navigationStep.id === this.state.selectedNavigationStep.id;
    });
    App.selectedNode = null;

    this.setState({
      selectedNavigationStep: this.props.navigation.navigation_steps[index + 1],
    });
  }

  handleCreateTodo = (todo) => {
    let navigation = update(this.container, {
      todos: {$push: [todo]}
    });

    this.props.onUpdate(navigation);
    this.addDisplayedTodoWithChildren(todo);
  }

  handleUpdateTodo = (todo) => {
    this.updateDisplayedTodos(todo);

    let index = this.findIndexOfTodo(todo.id);
    let navigation = update(this.container, {
      todos: {[index]: {$set: todo}}
    });

    this.props.onUpdate(navigation);
  }

  handleDeleteTodo = (todo) => {
    let displayedTodoIndex = this.findDisplayedTodoIndex(todo.id);

    let displayedTodos = update(this.state.displayedTodos, {
      $splice: [[displayedTodoIndex]],
    });

    this.setState({
      displayedTodos: displayedTodos,
    });

    let todoInNavigationIndex = this.findIndexOfTodo(todo.id);
    let navigation = update(this.container, {
      todos: {$splice: [[todoInNavigationIndex, 1]]}
    });

    this.props.onUpdate(navigation);
  }

  handleShowClaims = () => {
    this.refs.claimDialog.open();
  }

  handleClickBtnHelp = () => {
    this.refs.helpDialog.open(this.props.navigation.id);
  }

  handleImportFlow = (flow) => {
    let displayedTodos = this.state.displayedTodos;
    let lastDisplayedTodo = displayedTodos[displayedTodos.length - 1];
    let parentTodoId = lastDisplayedTodo ? lastDisplayedTodo.todo.id : null;
    let nodeId = lastDisplayedTodo ? lastDisplayedTodo.selectedNodeId : null;

    API.Navigation.importFlow(this.handleImportFlowCallBack,
      this.props.navigation.id, this.state.selectedNavigationStep.id,
      flow.id, parentTodoId, nodeId);
  }

  handleImportFlowCallBack = (status, data) => {
    if (data.todos.length < 1) {
      Helper.showErrors(t("navigations.empty_todos"));
    } else {
      let navigation = update(this.container, {
        todos: {$push: data.todos}
      });

      this.props.onUpdate(navigation);
      this.addDisplayedTodoWithChildren(data.todos[0]);
    }
  }

  render() {
    if (!this.props.navigation && !this.props.flow) return null;

    let navigation = this.props.navigation;
    let flow = this.props.flow;

    let displayedTodos = this.state.displayedTodos;
    let lastStep = navigation ?
      navigation.navigation_steps[navigation.navigation_steps.length - 1] : null;
    let isLastStep = !!this.props.flow || this.state.selectedNavigationStep === lastStep;
    let lastDisplayedTodo = displayedTodos[displayedTodos.length - 1];
    let isShowClaim = this.state.isShowClaims;

    return (
      <div className="navigation-content">
        <div className="main-navigation">
          <div className="navigation">
            <div className="left-content">
            {this.props.navigation ?
              <StepBar
                lastDisplayedTodo={lastDisplayedTodo}
                currentNavigationStep={this.state.selectedNavigationStep}
                onChange={this.handleChangeStep}
                onShowClaims={this.handleShowClaims}
                onClickBtnHelp={this.handleClickBtnHelp}
                title={navigation.line.name}
                navigationSteps={navigation.navigation_steps} />
              : null
            }
            </div>
            <div className="todos-content">
                <TodoList
                  locationState={this.props.locationState}
                  onlyView={this.props.onlyView}
                  onDelete={this.handleDeleteTodo}
                  onUpdate={this.handleUpdateTodo}
                  onImport={this.handleImportFlow}
                  isLastStep={isLastStep}
                  onGotoNextStep={flow ? null : this.handleGotoNextStep}
                  onCreateTodo={this.handleCreateTodo}
                  onClickNode={this.handleChangeTodoNode}
                  displayedTodos={displayedTodos}
                  navigationId={navigation ? navigation.id : null}
                  flowId={flow ? flow.id : null}
                  navigationStep={flow || this.state.selectedNavigationStep} />
            </div>
          </div>
        </div>
        <ClaimDialog ref="claimDialog" />
        <HelpDialog ref="helpDialog" />
      </div>
    );
  }
}
