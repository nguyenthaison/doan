import KeyBoardArrowLeft from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import {Link} from 'react-router';
import Reaction from "./Reaction";
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from "material-ui/svg-icons/action/delete";

export default class FaqDetail extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      faquestion: null,
      relatedFaqs: null,
      relatedComs: null,
      notFound: false,
    }

    this.apiName = "";
    this.baseLink = "";
    this.type = "faq";
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.params.id;
    let newId = this.props.params.id;
    if (newId !== oldId) {
      this.getFaquestion();
    }
  }

  getOptions() {
    let include = {
      creator: {only: ["name"]},
      updater: {only: ["name"]},
      teams: {only: ["id"]},
      [`client_${this.apiName.toLowerCase()}_lines`]: {
        include: {
          client: {only: ["id", "short_name"]},
          line: {only: ["id", "name"]},
        }
      },
      [`${this.apiName.toLowerCase()}_tags`]: {
        include: {
          tag: {only: ["id", "name"]},
          parent_tag: {only: ["id", "name"]},
        }
      },
      big_trouble: {only: ["name"]},
      medium_trouble: {only: ["name"]},
      small_trouble: {only: ["name"]},
      tiny_trouble: {only: ["name"]},
      attachments: {methods: ["url", "thumb_url"]},
    };

    if (this.type === "faq") {
      include["answer_attachments"] = {methods: ["url", "thumb_url"]};
    }

    if (this.type === "community") {
      include["faquestion"] = {only: ["id", "name"]};
    }

    return {
      include: JSON.stringify(include),
      with_related: true,
      update_view: true,
    }
  }

  getFaquestion() {
    let faqId = this.props.params.id;
    API[this.apiName].get(this.handleGetFaquestionCallback, faqId,
      this.getOptions());
  }

  handleGetFaquestionCallback = (status, data) => {
    if (!status) {
      this.setState({
        notFound: true,
      });
    } else {
      this.setState({
        faquestion: data.faquestion,
        relatedFaqs: data.related_faqs,
        relatedComs: data.related_coms,
        authorized: data.authorized,
      });
    }
  }

  handleUpdateReaction = (reaction) => {
    let faq = this.state.faquestion;
    let newState = update(faq, {$merge: reaction});
    this.setState({
      faquestion: newState,
    });
  }

  handleClickDelete = () => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.delete"),
      this.handleConfirmDelete);
  }

  handleConfirmDelete = () => {
    let faqId = this.props.params.id;
    API[this.apiName].delete(this.handleDeleteCallback, faqId);
  }

  handleDeleteCallback = (status, data) => {
    if (status) {
      Helper.transitionTo(this.baseLink);
      Helper.showMessage(t("common.message.deleted_success"));
    } else {
      Helper.showErrors(data);
    }
  }

  renderClientLineList = () => {
    let clienLines = this.state.faquestion[`client_${this.apiName.toLowerCase()}_lines`];
    return clienLines.map((clientLine, index) => {
      return(
        <span key={index}>
          {clientLine.client.short_name}
          {clientLine.line ? " > " + clientLine.line.name : ""}
          {index != (clienLines.length - 1) ? " , " : ""}
        </span>
      );
    })
  }

  renderTagList = () => {
    let faqTags = this.state.faquestion[`${this.apiName.toLowerCase()}_tags`];
    return faqTags.map((faqTag, index) => {
      let childTagFormat = faqTag.tag ? " > " + faqTag.tag.name : "";
      return(
        <span key={index}>
          {faqTag.parent_tag.name}
          {childTagFormat}
          {index != (faqTags.length - 1) ? " , " : ""}
        </span>
      );
    })
  }

  renderTroubleList = () => {
    let troubles = [
      this.state.faquestion.big_trouble,
      this.state.faquestion.medium_trouble,
      this.state.faquestion.small_trouble,
      this.state.faquestion.tiny_trouble
    ]
    return troubles.map((trouble, index) => {
      return(
        <span key={index}>
          {trouble ? trouble.name : ""} {troubles[index +1] ? " > " : ""}
        </span>
      )
    });
  }

  renderEditButton = () => {
    return (
      <cm.RaisedButton
        secondary={true}
        icon={<ModeEdit />}
        className="btn-mr5"
        label={t("common.edit")}
        transitionTo={this.baseLink + this.state.faquestion.id + "/edit"}
      />
    );
  }

  renderDeleteButton() {
    return (
      <cm.RaisedButton
        icon={<ActionDelete />}
        className="btn-delete"
        label={t("common.delete")}
        onClick={this.handleClickDelete}
      />
    );
  }

  renderRelated= (faqs, type = "faq") => {
    if (!faqs) {
      return null;
    }
    let baseLink = type == "faq" ? "/faqs/" : "/communities/";
    return faqs.map((relatedFaq, index) => {
      return (
        <div className="related-faq" key={index}>
          <Link to={baseLink + relatedFaq.id}>
            <h4 className="ellipsis-text" title={relatedFaq.title}>{relatedFaq.title}</h4>
          </Link>
          <p className="ellipsis-text" title={relatedFaq.question}>{relatedFaq.question}</p>
        </div>
      );
    });
  }

  renderTitleAndReaction = () => {
    let faquestion = this.state.faquestion;
    return (
      <div className="faq-title-detail row">
        <div className="faq-title">
          <label className={faquestion.priority + " priority-label"}>
            <span>
              {this.type == "faq" ? t("faquestions.attributes.priority") : t("faquestions.attributes.severity")}:
            </span>
            {t(`faquestions.priorities.${faquestion.priority}`)}
          </label>
          {faquestion.title}
        </div>
        <div className="pull-right">
          <Reaction
            faquestion={faquestion}
            onUpdated={this.handleUpdateReaction}
            apiName={this.apiName}
            />
        </div>
      </div>
    );
  }

  renderBackButton = () => {
    return (
      <cm.RaisedButton
        primary={true}
        label={t("common.back")}
        onClick={() => Helper.history.goBack()}
        icon={<i className="material-icons">chevron_left</i>}
        style={{color: "white"}}
      />
    );
  }

  render() {
    return(
      <div></div>
    );
  }
}
