import {Link} from 'react-router';
import Reaction from "./Reaction";

export default class FaquestionItem extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleClick(linkToDetail){
    Helper.transitionTo(linkToDetail);
  }

  renderUpdatedAt() {
    return (
      <label>
        {t("common.attributes.updated_at")}:{this.props.faquestion.updated_at}
      </label>
    );
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
        <span>
          <i className="material-icons" style={{color: theme.secondaryColor}}>chat_bubble</i>
        </span>
        {t("faquestions.index.no_id")}{faquestion["faquestion"].id}{t("communities.index.com_id")}
      </label>
    );
  }

  render() {
    let faquestion = this.props.faquestion;
    let splitedQuestion = faquestion.question.split('\n');

    return(
      <div className={"faq-item pointer row " + this.props.backgroundClassName}
        onClick={() => this.handleClick(this.props.linkToDetail)}>
        <div className="faq-body">
          <div className="faq-header">
            <label>{t("faquestions.index.no_id")}{faquestion.id}</label>
            <label>{t("common.attributes.created_at")}:{faquestion.created_at}</label>
            {this.props.type == "faq" ? this.renderUpdatedAt() : null}
            {faquestion.community_id ? this.renderCommunityId(faquestion) : null}
            {faquestion["faquestion"] ? this.renderFaquestionId(faquestion) : null}
          </div>

          <div className="faq-title row">
            <label className={faquestion.priority + " priority-label col-md-2"}>
              <span>
                {this.props.type == "faq" ? t("faquestions.attributes.priority") : t("faquestions.attributes.severity")}:
              </span>
              {t(`faquestions.priorities.${faquestion.priority}`)}
            </label>
            <div
              title={faquestion.title}
              className="ellipsis-text faq-title-content col-md-8"
              dangerouslySetInnerHTML={{__html: faquestion.title.escape().replace(/ /gi, '&nbsp;')}}
              >
            </div>
          </div>
          <div
            className="col-md-9 faq-question-content ellipsis-text"
            title={faquestion.question}
            dangerouslySetInnerHTML={{
              __html: splitedQuestion[0].trim().escape().replace(/ /gi, '&nbsp;')
                + (splitedQuestion.length > 1 ? "..." : "")
            }}
            >
          </div>
        </div>
        <Reaction
          faquestion={faquestion}
          onUpdated={this.props.page ? null : this.props.onUpdated}
          apiName={this.props.page ? null : this.props.apiName}
          withComment={this.props.page ? null : this.props.withComment}
          page={this.props.page}
        />
      </div>
    );
  }
}
