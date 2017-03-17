import Reaction from "../FaqList/Reaction";
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ModeComment from 'material-ui/svg-icons/editor/mode-comment';
import FaqDetail from "../FaqList/FaqDetail";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

export default class CommunityDetail extends FaqDetail {
  constructor(props) {
    super(props);

    this.apiName = "Community";
    this.baseLink = "/communities/";
    this.type = "community";

    this.state = update(this.state, {$merge:{
      showNewCommentForm: false,
      editingId: 0,
    }});
  }

  componentDidMount() {
    this.setToolBar(t("communities.title"), "/communities/new/");
    this.getFaquestion();
  }

  getExtendParams() {
    return {
      "commentable_id": this.state.faquestion.id,
      "commentable_type": "Community",
    }
  }

  handleUpdateReactionForComment = (reaction) => {
    let faquestion = this.state.faquestion;
    let index = faquestion.comments.findIndex((obj) => obj.id === reaction.id);
    faquestion = update(faquestion, {comments: {[index]: {$merge: reaction}}});

    this.setState({
      faquestion: faquestion,
    });
  }

  handleShowNewCommentForm = () => {
    if (this.state.faquestion.moved_to_faq) {
      Helper.transitionTo(`/faqs/${this.state.faquestion.faquestion_id}`);
    } else {
      this.setState({
        editingId: 0,
        showNewCommentForm: true,
      });
    }
  }

  handleHideCommentForm = () => {
    this.setState({
      editingId: null,
      showNewCommentForm: false,
    });
  }

  handleUpdateComment = (comment, isCreate) => {
    this.handleHideCommentForm();

    let newFaquestion = null;

    if (isCreate) {
      newFaquestion = update(this.state.faquestion, {["comments"]: {$unshift: [comment]}});
    } else {
      let faquestion = this.state.faquestion;
      let index = faquestion.comments.findIndex((obj) => obj.id === comment.id);
      newFaquestion = update(faquestion, {comments: {[index]: {$set: comment}}});
    }

    this.setState({
      faquestion: newFaquestion,
    });
  }

  handleShowEditCommentForm = (comment) => {
    let newState = update(this.state.editingId, {$set: comment.id});

    this.setState({
      showNewCommentForm: false,
      editingId: newState,
    });
  }

  handleRefreshListCommentAfterDelete = (comments) => {
    let newFaquestion = update(this.state.faquestion, {["comments"]: {$set: comments}});

    this.setState({
      faquestion: newFaquestion,
    });
  }

  renderCommentList = () => {
    let comments = this.state.faquestion.comments;
    return comments.map((comment) => {
      if (this.state.editingId == comment.id) {
        return (
          <CommentForm
            extendParams={this.getExtendParams()}
            apiName={"Comment"}
            key={comment.id}
            onCancel={this.handleHideCommentForm}
            comment={comment}
            communityId={this.state.faquestion.id}
            onSubmit={this.handleUpdateComment}
          />
        );
      } else {
        return (
          <CommentItem
            onClickEdit={this.handleShowEditCommentForm}
            onUpdate={this.handleUpdateReactionForComment}
            comment={comment}
            onChange={this.handleRefreshListCommentAfterDelete}
            movedToFaq={this.state.faquestion.moved_to_faq}
            key={comment.id}/>
        );
      }
    });
  }

  renderFaquestionId(faquestionId) {
    return (
      <label>
        {t("faquestions.index.no_id")}{faquestionId}{t("communities.index.com_id")}
      </label>
    );
  }

  renderFaquestionCreatedAt(faquestion) {
    return (
      <label>
        <span>{t("communities.index.moved_at")}:{faquestion["faquestion"].created_at}</span>
      </label>
    );
  }

  render() {
    let faquestion = this.state.faquestion;
    if (!faquestion) {
      return null;
    }

    return(
      <div className="community-detail faq-detail-container row">
        <div className="main-details">
          <div className="row panel panel-default">
            <div className="faq-infor-detail row">
              {this.renderBackButton()}
              <div className="faq-time-detail pull-right text-align-right">
                <div>
                  {faquestion.faquestion_id ?
                    <span>
                      <i className="material-icons" style={{color: theme.secondaryColor}}>chat_bubble</i>
                      {this.renderFaquestionId(faquestion.faquestion_id)}
                    </span> : ""}
                  <span>
                    {faquestion.faquestion_id ? this.renderFaquestionCreatedAt(faquestion) : null}
                  </span>
                </div>
                <div>
                  <span>{t("faquestions.index.no_id")}{faquestion.id}</span>
                  <span style={{paddingLeft: "53px"}}>
                    {t("common.attributes.created_at")}:{faquestion.created_at}
                  </span>
                </div>
              </div>
            </div>
            {this.renderTitleAndReaction()}
            <div className="faq-question-detail white-space">
              <span>
                <i className="material-icons" style={{color: theme.secondaryColor}}>account_circle</i>
                {faquestion.creator ? faquestion.creator.name : ""}
              </span>
              <p>{faquestion.question}</p>
            </div>
            <cm.AttachmentList attachments={faquestion.attachments}/>
            <div className="other-info">
              <div className="row faq-client-lines-detail">
                <div><i className="material-icons" style={{color: theme.secondaryColor}}>perm_phone_msg</i></div>
                <div className="col-md-10">{this.renderClientLineList()}</div>
              </div>
              <div className="row faq-troubles-detail">
                <div><i className="material-icons" style={{color: theme.secondaryColor}}>warning</i></div>
                <div className="col-md-10">{this.renderTroubleList()}</div>
              </div>
              <div className="row faq-tags-detail">
                <div><i className="material-icons" style={{color: theme.secondaryColor}}>assignment_turned_in</i></div>
                <div className="col-md-10">{this.renderTagList()}</div>
              </div>
            </div>
            <div className="row">
              <div className="new-comment">
                <cm.RaisedButton
                  label={faquestion.moved_to_faq ? t("comments.button.go_to_faq") : t("comments.button.new_comment")}
                  labelPosition="after"
                  primary={true}
                  onClick={this.handleShowNewCommentForm}
                  icon={<ModeComment />}
                /><br></br>
                <div className="total-comment">
                  {t("communities.show.total_comment")}:
                  <span className="total-comment-number">
                    {this.state.faquestion.comments.length}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              {this.state.showNewCommentForm ?
                <CommentForm
                  extendParams={this.getExtendParams()}
                  apiName={"Comment"}
                  communityId={this.state.faquestion.id}
                  onCancel={this.handleHideCommentForm}
                  onSubmit={this.handleUpdateComment}
                  />
                  : null}
            </div>
            <div className="row comment-list">
              {this.renderCommentList()}
            </div>
          </div>
          <div className="pull-right">
            <div>
              {this.state.authorized.edit ? this.renderEditButton() : null}
              {this.state.authorized.delete ? this.renderDeleteButton() : null}
            </div>
          </div>
        </div>
        <div className="related-items">
          <div className="row related-faqs smart-scroll">
            <div className="related-faqs-title" style={{background: theme.secondaryColor}}>
              <h4>
                <i className="material-icons">comment</i>
                <span>{t("faquestions.detail.related_FAQs")}</span>
              </h4>
            </div>
            <div className="related-faqs-content smart-scroll">
              {this.renderRelated(this.state.relatedFaqs)}
            </div>
          </div>
          <div className="row related-faqs smart-scroll">
            <div className="related-faqs-title" style={{background: theme.secondaryColor}}>
              <h4>
                <i className="material-icons">forum</i>
                <span>{t("faquestions.detail.related_Coms")}</span>
              </h4>
            </div>
            <div className="related-faqs-content smart-scroll">
              {this.renderRelated(this.state.relatedComs, "community")}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
