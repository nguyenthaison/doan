import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import EditorModeComment from 'material-ui/svg-icons/editor/mode-comment';

export default class Reaction extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleChangeReaction = (reaction, e) => {
    e.stopPropagation();
    API[this.props.apiName].updateReaction(
      this.handleUpdateReactionCallback,
      reaction,
      this.props.faquestion.id
    );
  }

  handleUpdateReactionCallback = (status, data) => {
    if (status) {
      this.props.onUpdated(
        data.reaction
      );
    }
  }

  renderReactionCount(count) {
    let countText = count > 999 ? "999+" : count;

    return <span title={count} className="reaction-count">{countText}</span>
  }

  renderComment() {
    let comment_count = this.props.faquestion.comment_count;
    return (
      <div className="reaction-item reaction-comment">
        <span title={comment_count}>
          <EditorModeComment />
          <span>{t("communities.index.comment")} </span>
          {comment_count < 1000 ? comment_count : "999+"}
        </span>
      </div>
    )
  }

  render() {
    let faquestion = this.props.faquestion;
    let faqUser = faquestion.faq_user || {};

    return(
      <div className="faq-reaction pull-right">
        <div className="reaction-item">
          <mui.IconButton
            className={"reaction-button " + (faqUser.view ? "active" : "")}>
            <RemoveRedEye />
          </mui.IconButton>
          {this.renderReactionCount(faquestion.views)}
        </div>

        <div className="reaction-item">
          <mui.IconButton
            disabled={this.props.page || !faquestion.authorized.helpful}
            className={"reaction-button " + (!this.props.page || faqUser.helpful ? "active" : "")}
            onClick={(e) => this.handleChangeReaction("helpful", e)}>
            <ThumbUp />
          </mui.IconButton>
          {this.renderReactionCount(faquestion.helpfuls)}
        </div>

        <div className="reaction-item last">
          <mui.IconButton
            disabled={this.props.page}
            className={"reaction-button " + (faqUser.favorite ? "active-favorite" : "")}
            onClick={(e) => this.handleChangeReaction("favorite", e)}>
            <ActionFavorite />
          </mui.IconButton>
          {this.renderReactionCount(faquestion.favorites)}
        </div>

        {this.props.withComment ? this.renderComment() : null}
      </div>
    );
  }
}
