export default class TodoDetail extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleSelectNode = (node) => {
    this.props.onClickNode(this.props.todo.id, node);
  }

  handleClickEdit = () => {
    this.props.onEdit(this.props.todo.id);
  }

  handleClickDelete = () => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.delete"),
      this.handleConfirmDelete);
  }

  handleConfirmDelete = () => {
    let todoId = this.props.todo.id;
    API.Todo.delete(this.handleDeleteCallback, todoId);
  }

  handleDeleteCallback = (status, data) => {
    if (!status) return;
    this.props.onDelete(this.props.todo);
  }

  renderEditButton() {
    return (
      <span
        onClick={this.handleClickEdit}
        className="edit-todo-btn pointer">
        <i className="material-icons">mode_edit</i>
      </span>
    );
  }

  renderDeleteButton() {
    return (
      <span
        onClick={this.handleClickDelete}
        className="delete-todo-btn pointer">
        <i className="material-icons">clear</i>
      </span>
    );
  }

  renderNodeList() {
    return this.props.todo.nodes.map(node => {
      return (
        <span key={node.id} title={node.name}>
          <cm.RaisedButton
            onClick={() => this.handleSelectNode(node)}
            className="node"
            label={node.name}
            secondary={node.id === this.props.selectedNodeId ? false : true}
            primary={node.id === this.props.selectedNodeId ? true : false}
          />
        </span>
      );
    });
  }

  render() {
    let todo = this.props.todo;
    return (
      <div className="todo">
        <div className="todo-title">
          <span className="left-border">
          </span>
          <span className="content white-space">
            {todo.title}
          </span>
          {this.props.onlyView ? null: this.renderDeleteButton()}
          {this.props.onlyView ? null: this.renderEditButton()}
        </div>
        <div className="todo-content white-space">
          {todo.content}
        </div>
        <div className="todo-attachments">
          <cm.AttachmentList attachments={todo.attachments}/>
        </div>
        <div className="node-list">
          {this.renderNodeList()}
        </div>
      </div>
    );
  }
}
