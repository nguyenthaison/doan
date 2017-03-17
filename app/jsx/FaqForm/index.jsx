import ClientLines from "./ClientLines";
import TeamList from "./TeamList";
import TroubleList from "./TroubleList";
import Tags from "./Tags";
import Warning from 'material-ui/svg-icons/alert/warning';
import AssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import ActionPermPhoneMsg from 'material-ui/svg-icons/action/perm-phone-msg';
import BasicInfo from "./BasicInfo";

export default class FaqForm extends PageComponent {
  constructor(props) {
    super(props);

    this.isCreateForm = !this.props.commentId && !this.props.id;

    this.state = {
      faq: this.isCreateForm ? {id: null} : null,
      errors: {},
    }
  }

  getFaqName() {
    let name = "";
    switch(this.props.type) {
      case "faq":
        name = "faquestion";
        break;
      case "community":
        name = "community";
        break;
    }
    return name;
  }

  getOptions() {
    let faqName = this.getFaqName();
    let include = {
      creator: {only: ["name"]},
      updater: {only: ["name"]},
      teams: {only: ["id"]},
      [`client_${faqName}_lines`]: {
        include: {
          client: {only: ["id", "short_name"]},
          line: {only: ["id", "name"]},
        }
      },
      [`${faqName}_tags`]: {
        include: {
          tag: {only: ["id", "name"]},
          parent_tag: {only: ["id", "name"]},
        }
      },
      big_trouble: {only: ["id", "name"]},
      medium_trouble: {only: ["id", "name"]},
      small_trouble: {only: ["id", "name"]},
      tiny_trouble: {only: ["id", "name"]},
      attachments: {},
    };

    if (this.props.type === "faq") {
      include["answer_attachments"] = {};
    }

    return {
      include: JSON.stringify(include),
    }
  }

  componentDidMount() {
    let faqId = this.props.id;
    let apiName = this.getApiName();

    if (this.props.commentId) {
      this.handleCloneFaq();
    } else if (faqId) {
      API[apiName].get(this.handleGetFaqCallback, faqId, this.getOptions());
    }
  }

  handleCloneFaq() {
    let commentId = this.props.commentId;
    API.Faquestion.getDataForCloning(this.handleGetDataForCloning, commentId,
      this.getOptions());
  }

  handleGetDataForCloning = (status, data) => {
    if (status) {
      let newFaq = data.faq;
      newFaq["id"] = null;
      newFaq["priority"] =  null;
      this.setState({
        faq: newFaq,
      });
    }
  }

  handleClick = () => {
    var newState = update(this.state.faq,
      {$merge: this.refs.basicInfo.getBasicInfo()});

    let client_line_attributes = "";
    let tag_attributes = "";

    switch(this.props.type) {
      case "faq":
        client_line_attributes = "client_faquestion_lines_attributes";
        tag_attributes = "faquestion_tags_attributes";
        break;
      case "community":
        client_line_attributes = "client_community_lines_attributes";
        tag_attributes = "community_tags_attributes";
        break;
    }

    newState["team_ids"] = this.refs.teamList.getCheckedTeamIds();
    newState[client_line_attributes] = this.refs.clientLine.getChosenLineIds();
    newState[tag_attributes] = this.refs.tag.getChosenTagIds();

    let troubleIds = this.refs.trouble.getTroubleIds();
    [
      newState["big_trouble_id"],
      newState["medium_trouble_id"],
      newState["small_trouble_id"],
      newState["tiny_trouble_id"]
    ] = troubleIds

    this.setState({
      faq: newState,
    });

    let apiName = this.getApiName();
    API[apiName].create(this.handleValidateCallback, newState,
      {only_validate: true});
  }

  handleValidateCallback = (status, data) => {
    if (status) {
      Helper.showConfirm(
        t("common.message.confirmation.title"),
        t("common.message.confirmation.update"),
        this.handleConfirmSubmit);
    } else {
      Helper.showErrors(data, "faquestions");
    }
  }

  handleConfirmSubmit = () => {
    let faq = this.state.faq;
    let apiName = this.getApiName();

    if (this.props.id) {
      API[apiName].update(this.handleSaveCallback, faq);
    } else {
      API[apiName].create(this.handleSaveCallback, faq);
    }
  }

  handleSaveCallback = (status, data) => {
    if (status) {
      let faqId = this.props.id;
      let pathName = this.getPathName();

      if (faqId) {
        Helper.showMessage(t("common.message.updated_success"));
        Helper.history.goBack();
      } else {
        Helper.showMessage(t("common.message.created_success"));
        Helper.transitionTo(`/${pathName}`);
      }
    } else {
      if (data && data.moved_to_faq) {
        Helper.showErrors(t("communities.messages.is_moved"));
        Helper.transitionTo(`/communities/${this.state.faq.community_id}`);
      } else {
        Helper.showErrors(data, "faquestions");
      }
    }
  }

  handleGetFaqCallback = (status, data) => {
    if (status) {
      this.setState({
        faq: data.faquestion,
      });
    } else {
      Helper.showErrors(data);
    }
  }

  getPathName() {
    let path = "";
    switch (this.props.type) {
      case "faq":
        path = "faqs";
        break;
      case "community":
        path = "communities";
        break;
    }
    return path;
  }

  getApiName() {
    let apiName = "";
    switch (this.props.type) {
      case "faq":
        apiName = "Faquestion";
        break;
      case "community":
        apiName = "Community";
        break;
    }
    return apiName;
  }

  renderLabel = (fieldName, required = false) => {
    let requiredText = required ? <div className="required">{t("common.required")}</div> : "";
    return(
      <div className="form-section-title">
        {t(`faquestions.attributes.${fieldName}`)}
        {requiredText}
      </div>
    );
  }

  render() {
    let faq = this.state.faq;

    if (!this.isCreateForm && !faq) {
      return null;
    }

    let troubles = [
      faq.big_trouble,
      faq.medium_trouble,
      faq.small_trouble,
      faq.tiny_trouble
    ];

    let pathName = this.getPathName();

    let formTitle = "";

    if (this.props.type === "faq") {
      formTitle = t("faquestions.form.create_new");
      if (this.props.commentId) {
        formTitle = t("faquestions.form.move_to_faq");
      }
    } else if (this.props.type === "community") {
      formTitle = t("communities.form.create_new");
    }

    return (
      <div className="row faq-form">
        <div className="faq-form-container">
          <div className="form-title">
            {formTitle}
          </div>
          <div className="form-fields">
            <BasicInfo
              ref="basicInfo"
              faq={faq}
              withoutAnswer={this.props.withoutAnswer}
              type={this.props.type}
            />
            <div className="row">
              <TeamList ref="teamList" defaultCheckedTeams={faq.teams} />
            </div>
            <div className="row">
              <div className="col-md-10 form-group">
                <div className="row">
                  <ActionPermPhoneMsg className="form-section-icon" style={{color: theme.secondaryColor}}/>
                  <div className="form-section-title">
                    {t("faquestions.client_lines.client_line")}
                  </div>
                </div>
                <div className="client-line-field">
                  <ClientLines ref="clientLine" defaultChosenClientLines={
                    faq[`client_${this.getApiName().toLowerCase()}_lines`]} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10 form-group">
                <div className="row">
                  <Warning className="form-section-icon" style={{color: theme.secondaryColor}}/>
                  {this.renderLabel("troubles")}
                </div>
                <div>
                  <TroubleList ref="trouble" defaultTroubles={troubles} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10 form-group">
                <div className="row">
                  <AssignmentTurnedIn className="form-section-icon" style={{color: theme.secondaryColor}}/>
                  {this.renderLabel("tags")}
                </div>
                <div>
                  <Tags ref="tag" defaultFaqTags={faq[`${this.getApiName().toLowerCase()}_tags`]} />
                </div>
              </div>
            </div>
          </div>
          <div className="row form-commands">
            <div className="col-md-10 center">
              <cm.RaisedButton
                secondary={true}
                onClick={() => Helper.history.goBack()}
                label={t("common.cancel")}
              />
              <cm.RaisedButton
                primary={true}
                style={{marginLeft: 15}}
                onClick={this.handleClick}
                label={faq.id ? t("common.update") : t("common.create")}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
