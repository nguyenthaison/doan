import ThumpUp from "material-ui/svg-icons/action/thumb-up";
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

export default class FaqList extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleRedirectUrl = (item, type) => {
    item = type === "faq" ? item : item.community;
    return (
      () => Helper.transitionTo(this.props.basePath + item.id)
    )
  }

  renderCommunityId(faquestion) {
    return (
      <label>
        <span><i className="material-icons" style={{color: theme.secondaryColor}}>forum</i></span>
        {t("faquestions.index.no_id")}{faquestion.community_id}{t("faquestions.index.moved")}
      </label>
    );
  }

  renderFaquestionId(faquestion) {
    return (
      <label>
      <span><i className="material-icons" style={{color: theme.secondaryColor}}>chat_bubble</i></span>
        {t("faquestions.index.no_id")}{faquestion["faquestion"].id}{t("communities.index.com_id")}
      </label>
    );
  }

  renderFavorite(item) {
    return (
      <div className="like-number pull-right">
        <div>
          <RemoveRedEye className="thumb-up" />
          <span className="like-num">{item.views > 999 ? "999+" : item.views}</span>
        </div>
        <div>
          <ThumpUp className="thumb-up" />
          <span className="like-num">{item.helpfuls > 999 ? "999+" : item.helpfuls}</span>
        </div>
        <div>
          <ActionFavorite className="thumb-up" />
          <span className="like-num">{item.favorites > 999 ? "999+" : item.favorites}</span>
        </div>
      </div>
    );
  }

  renderVotesCom(item) {
    return (
      <div className="like-number pull-right">
        <div>
          <ThumpUp className="thumb-up" />
          <span className="like-num">{item.votes > 999 ? "999+" : item.votes}</span>
        </div>
      </div>
    )
  }

  renderFaqItem(item) {
    return (
      <div className="row-item">
        <div className="pull-left item-main-content">
          <div className="datetime">
            <label>{t("faquestions.index.no_id")}{item.id}</label>
            <label>{t("common.attributes.created_at")}:{item.created_at}</label>
            <label>{t("common.attributes.updated_at")}:{item.updated_at}</label>
             {item.community_id ? this.renderCommunityId(item) : null}
          </div>
          <div className="faq-com-title">
            <div
              className="ellipsis-text"
              title={item.title}
              dangerouslySetInnerHTML={{__html: item.title.escape().replace(/ /gi, '&nbsp;')}}
            >
            </div>
          </div>
        </div>
        {this.renderFavorite(item)}
      </div>
    );
  }

  renderComItem(item) {
    let checkActivity = item.activity_type === "Comment";
    item = checkActivity ? item.comment : item.community;

    let title = checkActivity ? t("my_page.comment") + item.commentable.title :
      t("my_page.community") + item.title;

    return (
      <div className="row-item">
        <div className="pull-left item-main-content">
          <div className="datetime">
            <label>{t("faquestions.index.no_id")}{item.id}</label>
            <label>{t("common.attributes.created_at")}:{item.created_at}</label>
            <label>{t("common.attributes.updated_at")}:{item.updated_at}</label>
             {checkActivity ? (item["faquestion"] ? this.renderFaquestionId(item) : null) : null}
          </div>
          <div className="faq-com-title">
            <div
              className="ellipsis-text"
              title={title}
              dangerouslySetInnerHTML={{__html: title.escape().replace(/ /gi, '&nbsp;')}}
            >
            </div>
          </div>
          <div className="ellipsis-text text-content">
            {checkActivity ? item.content : item.question}
          </div>
        </div>
        {checkActivity ? this.renderVotesCom(item) : this.renderFavorite(item)}
      </div>
    );
  }

  renderFaqComList() {
    let list = this.props.list;
    let type = this.props.type;

    if (list.length === 0)
      return <div className="no-record">{t("common.message.no_record")}</div>;

    return (
      <div className="faq-list-content">
        {list.map(item =>
          <div className="table-row-striped item-row pointer"
            key={item.id}
            onClick={this.handleRedirectUrl(item, type)}>
            {type === "community" ? this.renderComItem(item) : this.renderFaqItem(item)}
          </div>
        )}
      </div>
      );
  }

  render() {
    return this.renderFaqComList();
  }
}
