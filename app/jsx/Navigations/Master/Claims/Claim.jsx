import ClaimForm from "./ClaimForm";

export default class Claim extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleClickEdit = (claim) => {
    this.props.onEdit(claim);
  }

  handleUpdate = (claim) => {
    this.props.onUpdate(claim);
  }

  handleClose = () => {
    this.props.onClose();
  }

  handleClickDelete = () => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.update"),
      () => this.handleDeleteClaim());
  }

  handleDeleteClaim = () => {
    let claimId = this.props.claim.id;
    API.Claim.delete(this.handleDeleteCallback, claimId);
  }

  handleDeleteCallback = (status, data) => {
    if (!status) return;
    this.props.onDelete(this.props.claim);
  }

  renderClaimDetail() {
    let claim = this.props.claim;
    let showButtonEditAndDelete = this.props.showButtonEditAndDelete;

    return (
      <div className="todo">
        <div className="todo-title">
          <span className="left-border">
          </span>
          <span className="content white-space">
            {claim.title}
          </span>
          {showButtonEditAndDelete ?
            <div>
              <span
                onClick={this.handleClickDelete}
                className="delete-todo-btn pointer">
                <i className="material-icons">clear</i>
              </span>
              <span
                onClick={() => this.handleClickEdit(claim)}
                className="edit-todo-btn pointer">
                <i className="material-icons">mode_edit</i>
              </span>
            </div> : null
          }
        </div>
        <div className="todo-content white-space">
          {claim.content}
        </div>
        <div className="todo-attachments">
          <cm.AttachmentList attachments={claim.attachments}/>
        </div>
      </div>
    )
  }

  render() {
    let isEditing = this.props.isEditing;

    return (
      <div>
        {isEditing ?
          <ClaimForm
            onUpdateCallback={this.handleUpdate}
            onClose={this.handleClose}
            claim={this.props.claim} /> : this.renderClaimDetail()
        }
      </div>
    )
  }
}
