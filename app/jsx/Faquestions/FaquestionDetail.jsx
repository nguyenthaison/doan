import Reaction from "../FaqList/Reaction";
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import FaqDetail from "../FaqList/FaqDetail";

export default class FaquestionDetail extends FaqDetail {
  constructor(props) {
    super(props);
    this.apiName = "Faquestion";
    this.baseLink = "/faqs/";
  }

  componentDidMount() {
    let authorizedPages  = App.auth.authorized_pages;
    this.setToolBar(t("faquestions.title"),
      authorizedPages.faqs && authorizedPages.faqs.new ? "/faqs/new" : "");
    this.getFaquestion();
  }

  renderCommunityFlag = () => {
    let faquestion = this.state.faquestion;
    return (
      <span>
        <i className="material-icons" style={{color: theme.secondaryColor}}>question_answer</i>
        {t("faquestions.index.no_id")}{faquestion.community_id}
        {t("faquestions.detail.moved_from")}
      </span>
    );
  }

  render() {
    if (this.state.notFound) {
      return <div className="faq-not-found">{t("faquestions.detail.not_found")}</div>;
    }

    let faquestion = this.state.faquestion;

    if (!faquestion) {
      return null;
    }

    return(
      <div className="faq-detail-container row">
        <div className="main-details">
          <div className="row panel panel-default">
            <div className="faq-infor-detail row">
              {this.renderBackButton()}
              <div className="faq-time-detail pull-right">
                {faquestion.community_id ? this.renderCommunityFlag() : null}
                <span>{t("faquestions.index.no_id")}{faquestion.id}</span>
                <span>{t("common.attributes.created_at")}:{faquestion.created_at}</span>
                <span>{t("common.attributes.updated_at")}:{faquestion.updated_at}</span>
                <span>
                  <i className="material-icons" style={{color: theme.secondaryColor}}>account_circle</i>
                  {faquestion.creator ? faquestion.creator.name : ""}
                </span>
              </div>
            </div>
            {this.renderTitleAndReaction()}
            <div className="faq-question-detail white-space">
              <div className="question-icon">
                <mui.Badge
                  className="faq-badge"
                  badgeContent={"Q"}
                  badgeStyle={{backgroundColor: theme.secondaryColor}}
                />
              </div>
              <div className="content">
                <cm.RegexLink text={faquestion.question} />
              </div>
              <cm.AttachmentList attachments={faquestion.attachments}/>
            </div>
            <div className="faq-answer-detail row white-space">
              <div className="answer-icon">
                <mui.Badge
                  className="faq-badge"
                  badgeContent={"A"}
                  badgeStyle={{backgroundColor: theme.primary1Color}}
                />
              </div>
              <div className="content">
                <cm.RegexLink text={faquestion.answer} />
              </div>
              <cm.AttachmentList attachments={faquestion.answer_attachments}/>
            </div>
            <div className="other-info">
              <div className="row faq-client-lines-detail">
                <div>
                  <i className="material-icons" style={{color: theme.secondaryColor}}>perm_phone_msg</i>
                </div>
                <div className="col-md-10">{this.renderClientLineList()}</div>
              </div>
              <div className="row faq-troubles-detail">
                <div><i className="material-icons" style={{color: theme.secondaryColor}}>warning</i></div>
                <div className="col-md-10">{this.renderTroubleList()}</div>
              </div>
              <div className="row faq-tags-detail">
                <div>
                  <i className="material-icons" style={{color: theme.secondaryColor}}>assignment_turned_in</i>
                </div>
                <div className="col-md-10">{this.renderTagList()}</div>
              </div>
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
