import ViewHeadLine from "material-ui/svg-icons/action/view-headline";
import CallSplit from "material-ui/svg-icons/communication/call-split";
import ActionDelete from "material-ui/svg-icons/action/delete";

const TODO_CATEGORIES = {
  text: "text",
  flow: "flow",
}

const MAX_NODE_NUMBER = 10;

export default class TodoForm extends BaseComponent {
  constructor(props) {
    super(props);

    let initTodo = {
      navigation_step_id: this.props.flowId ? null : this.props.navigationStepId,
      flow_id: this.props.flowId,
      category: null,
      nodes_attributes: [],
    };

    if (this.props.todo) {
      this.props.todo.nodes_attributes = this.props.todo.nodes;
    }

    this.state = {
      todo: this.props.todo || initTodo,
    }
  }

  handleChangeTodoInputField = (fieldName, value) => {
    let todo = update(this.state.todo, {[fieldName]: {$set: value}});

    this.setState({
      todo: todo,
    });
  }

  handleCancelTodoForm = () => {
    this.props.onClose();
  }

  handleCreateTodo = () => {
    let todo = this.state.todo;
    let parentDisplayedTodo = this.props.parentDisplayedTodo;

    todo["attachment_ids"] = this.refs.fileUpload.getAttachmentIds();
    if (this.props.navigationId) todo["navigation_id"] = this.props.navigationId;
    if (this.props.flowId) todo["flow_id"] = this.props.flowId;

    if (parentDisplayedTodo) {
      todo["parent_todo_id"] = parentDisplayedTodo.todo.id;
      todo["node_id"] = parentDisplayedTodo.selectedNodeId ? parentDisplayedTodo.selectedNodeId : null;
    }

    API.Todo.create(this.handleCreateTodoCallBack, todo);
  }

  handleUpdateTodo = () => {
    let todo = this.state.todo;
    let attachmentIds = this.refs.fileUpload.getAttachmentIds();
    todo["attachment_ids"] = attachmentIds.length == 0 ? [""] : attachmentIds;

    API.Todo.update(this.handleUpdateTodoCallBack, todo);
  }

  handleUpdateTodoCallBack = (status, data) => {
    if (status) {
      Helper.showMessage(t("common.message.updated_success"));
      this.props.onUpdate(data.todo);
    } else {
      Helper.showErrors(data, "todos");
    }
  }

  handleCreateTodoCallBack = (status, data) => {
    if (status) {
      Helper.showMessage(t("common.message.created_success"));
      this.props.onCreate(data.todo);
    } else {
      Helper.showErrors(data, "todos");
    }
  }

  handleSelectCategoryTodo = (category) => {
    let newTodo = update(this.state.todo, {
      category: {$set: category}
    });

    this.setState({
      todo: newTodo,
    });
  }

  handleAddNewNode = () => {
    let newTodo = update(this.state.todo, {
      nodes_attributes: {$push: [{_destroy: false}]}
    });

    this.setState({
      todo: newTodo,
    });
  }

  handleChangeInputNode = (value, index) => {
    let newTodo = update(this.state.todo, {
      nodes_attributes: {
        [index]: {name: {$set: value}},
      }
    });

    this.setState({
      todo: newTodo,
    });
  }

  handleRemoveNode = (index) => {
    let newTodo = update(this.state.todo, {
      nodes_attributes: {
        [index]: {_destroy: {$set: true}},
      }
    });

    this.setState({
      todo: newTodo,
    });
  }

  renderTextInputField(fieldName, value, onChangePropFunction, options = {}) {
    return (
      <div className="form-group">
        <cm.TextField
          fieldName={t(`todos.attributes.${fieldName}`)}
          value={value}
          fullWidth={true}
          onChange={onChangePropFunction}
          hintText={t(`todos.form.placeholder.${fieldName}`)}
          {...options}
        />
      </div>
    );
  }

  renderSelectAttachment() {
    return (
      <div className="select-attachment">
        <span className="upload-file-title">
          <i className="material-icons" style={{color: theme.secondaryColor}}>insert_photo</i>
          {t("comments.form.upload_file")}
        </span>
        <cm.FileUploader ref="fileUpload" defaultFiles={this.state.todo.attachments} />
      </div>
    );
  }

  renderCategoriesTodoButtonGroup() {
    return (
      <div className="categories-button-group">
        <div className="todo-type-label">
          <span>
            {t("todos.form.todo_type")}
          </span>
        </div>
        <cm.RaisedButton
          icon={<ViewHeadLine />}
          onClick={() => this.handleSelectCategoryTodo(TODO_CATEGORIES.text)}
          label={t("todos.form.button.only_text")}
          secondary={true}
        />
        <cm.RaisedButton
          icon={<CallSplit />}
          secondary={true}
          style={{marginLeft: 15}}
          onClick={() => this.handleSelectCategoryTodo(TODO_CATEGORIES.flow)}
          label={t("todos.form.button.branch")}
        />
        <cm.RaisedButton
          onClick={this.handleCancelTodoForm}
          label={t("common.cancel")}
          secondary={true}
          style={{marginLeft: 15}}
        />
      </div>
    );
  }

  renderNodeForm() {
    let nodes = this.state.todo.nodes_attributes;
    let undestroyNodes = nodes.filter(node => !node._destroy);

    return (
      <div className="node-list">
        {
          nodes.map((node, index) => {
            if (node._destroy) return;

            return (
              <div className="node" key={index}>
                <div className="form-group node-form">
                  {this.renderTextInputField("name", node.name,
                    (event, value) => this.handleChangeInputNode(value, index),
                    {maxLength: 10})}
                  <i
                    className="material-icons remove-search-icon pointer"
                    style={{color: theme.secondaryColor}}
                    onClick={() => this.handleRemoveNode(index)}>cancel
                  </i>
                </div>
              </div>
            );
          })
        }
        {
          undestroyNodes.length >= MAX_NODE_NUMBER ? null :
          <div className="pointer add-node" onClick={this.handleAddNewNode}>
            <i className="material-icons" style={{color: theme.secondaryColor}}>add_circle_outline</i>
            {t("todos.form.add_node")}
          </div>
        }
      </div>
    );
  }

  renderSubForm() {
    if (!this.state.todo.category) return null;

    return (
      <div className="subform-todo">
        <div className="content-todo">
          {this.renderTextInputField("content", this.state.todo.content,
            (event, value) => this.handleChangeTodoInputField("content", value),
            {multiLine: true, rowsMax: 10, maxLength: 600, counting: true})}
        </div>
        <div className="attachments-todo">
          {this.renderSelectAttachment()}
        </div>
        {this.state.todo.category === TODO_CATEGORIES.flow ? this.renderNodeForm() : null}
        <div className="cancel-save-group-button center">
          <cm.RaisedButton
            onClick={this.handleCancelTodoForm}
            label={t("common.cancel")}
            secondary={true}
          />
          <cm.RaisedButton
            primary={true}
            style={{marginLeft: 15}}
            onClick={this.state.todo.id ? this.handleUpdateTodo : this.handleCreateTodo}
            label={this.state.todo.id ? t("common.update") : t("common.save")}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="todo-form">
        <div className="title-todo">
          <input
            maxLength="100"
            type="text"
            value={this.state.todo.title || ""}
            onChange={(event) => this.handleChangeTodoInputField("title", event.target.value)}
            placeholder={t("todos.form.placeholder.title")}>
          </input>
        </div>
        {this.state.todo.category ? null : this.renderCategoriesTodoButtonGroup()}
        {this.renderSubForm()}
      </div>
    );
  }
}
