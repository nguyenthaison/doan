import CommentForm from "./CommentForm";
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';

export default class CommentItem extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleChangeReaction = () => {
    API.Comment.updateReaction(this.handleChangeReactionCallBack, this.props.comment);
  }

  handleChangeReactionCallBack = (status, data) => {
    if (status) {
      this.props.onUpdate(data.reaction);
    }
  }

  handleMoveToFaq = () => {
    let comment = this.props.comment;
    Helper.transitionTo(`/faqs/clone/${comment.id}`);
  }

  confirmDeleteComment = () => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.delete"),
      () => this.handleDeleteComment(this.props.comment));
  }

  handleDeleteComment = () => {
    API.Comment.delete(this.handleDeleteCommentCallBack, this.props.comment);
  }

  handleDeleteCommentCallBack = (status, data) => {
    if(status) {
      this.props.onChange(data.comments);
    }
  }

  renderEditIcon() {
    return (
      <span className="edit-comment" onClick={() => this.props.onClickEdit(this.props.comment)}>
        <i className="material-icons">mode_edit</i>
        {t("common.edit")}
      </span>
    );
  }

  renderDeleteIcon() {
    return (
      <span className="delete-comment" onClick={this.confirmDeleteComment}>
        <i className="material-icons">delete</i>
        {t("common.delete")}
      </span>
    );
  }

  renderMoveToFaqButton() {
    return (
      <div className="move-faq reaction-item btn">
        <span onClick={this.handleMoveToFaq}>
          {t("comments.button.faq")}
        </span>
      </div>
    );
  }

  renderReactionCount(count) {
    let countText = count > 999 ? "999+" : count;

    return <span title={count} className="reaction-count">{countText}</span>
  }

  renderLikeButton() {
    let comment = this.props.comment;
    return (
      <div className="reaction-item">
        <mui.IconButton
          disabled={comment.authorized.like ? false : true}
          className={"reaction-button " + (comment.is_vote ? "active" : "")}
          onClick={this.handleChangeReaction}>
          <ThumbUp />
        </mui.IconButton>
        {this.renderReactionCount(comment.votes)}
      </div>
    );
  }

  render() {
    let comment = this.props.comment;

    return (
      <div className="comment">
        <div className="created-at">
          <span>
            {t("common.attributes.created_at")}:
            {comment.created_at}
          </span>
        </div>
        <div className="comment-wrapper">
          <div className="row">
            <div className="top-infor">
              <div className="left-infor">
                <span>
                  <i className="material-icons" style={{color: theme.secondaryColor}}>account_circle</i>
                  {comment.creator_name}
                </span>
                {!this.props.movedToFaq && comment.authorized.edit ? this.renderEditIcon() : null}
                {!this.props.movedToFaq && comment.authorized.delete ? this.renderDeleteIcon() : null}
              </div>
              <div className="right-infor faq-reaction">
                {!this.props.movedToFaq && comment.authorized.move_faq ? this.renderMoveToFaqButton() : null}
                {this.renderLikeButton()}
              </div>
            </div>
            <div className="content-comment white-space">
              <cm.RegexLink text={comment.content} />
            </div>
            <cm.AttachmentList attachments={comment.attachments}/>
          </div>
        </div>
      </div>
    );
  }
}
