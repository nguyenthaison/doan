import TeamList from "../../FaqForm/TeamList";
import ClientLines from "../../FaqForm/ClientLines";
import Tags from "../../FaqForm/Tags";
import AssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import ActionPermPhoneMsg from 'material-ui/svg-icons/action/perm-phone-msg';
import DateRange from 'material-ui/svg-icons/action/date-range';
import ImageIcon from 'material-ui/svg-icons/image/image';
import BasicInfo from "./BasicInfo";

export default class NotificationForm extends PageComponent {
  constructor(props) {
    super(props);
    let isCreateForm = this.props.params.id ? false : true;
    this.state = {
      notification: isCreateForm ? {id: null} : null,
    }
  }

  componentDidMount() {
    if (this.props.params.id) {
      API.Notification.get(this.handleGetNotificationCallBack,
        this.props.params.id, this.getOptions());
    }
  }

  getOptions() {
    let include = {
      creator: {only: ["name"]},
      teams: {only: ["id", "name"]},
      client_notification_lines: {
        include: {
          client: {only: ["id", "short_name"]},
          line: {only: ["id", "name"]},
        }
      },
      notification_tags: {
        include: {
          tag: {only: ["id", "name"]},
          parent_tag: {only: ["id", "name"]},
        }
      },
      users: {only: ["id", "name"]},
      attachments: {methods: ["url", "thumb_url"]},
    };

    return {
      include: JSON.stringify(include)
    }
  }

  handleGetNotificationCallBack = (status, data) => {
    if (status) {
      this.setState({
        notification: data.notification,
      });
    } else {
      Helper.showErrors(data);
    }
  }

  handleClick = () => {
    let newState = update(this.state.notification,
      {$merge: this.refs.basicInfo.getBasicInfo()});
    newState["team_ids"] = this.refs.teamList.getCheckedTeamIds();
    newState["client_notification_lines_attributes"] = this.refs.clientLine.getChosenLineIds();
    newState["notification_tags_attributes"] = this.refs.tag.getChosenTagIds();
    let attachmentIds = this.refs.fileUpload.getAttachmentIds();
    attachmentIds = attachmentIds.length > 0 ? attachmentIds : [""];
    newState["attachment_ids"] = attachmentIds;
    this.setState({
      notification: newState,
    });
    if (this.props.params.id) {
      API.Notification.update(this.handleValidateCallback, newState,
        {only_validate: true});
    } else {
      API.Notification.create(this.handleValidateCallback, newState,
        {only_validate: true});
    }
  }

  handleValidateCallback = (status, data) => {
    if (status) {
      Helper.showConfirm(
        t("common.message.confirmation.title"),
        t("common.message.confirmation.update"),
        this.handleConfirmSubmit);
    } else {
      Helper.showErrors(data, "notifications");
    }
  }

  handleConfirmSubmit = () => {
    let notification = this.state.notification;
    if (this.props.params.id) {
      API.Notification.update(this.handleSaveCallback, notification);
    } else {
      API.Notification.create(this.handleSaveCallback, notification);
    }
  }

  handleSaveCallback = (status, data) => {
    if (status) {
      let notificationId = this.props.params.id;

      if (notificationId) {
        Helper.showMessage(t("common.message.updated_success"));
        Helper.history.goBack();
      } else {
        Helper.showMessage(t("common.message.created_success"));
        Helper.transitionTo("/notifications");
      }
    } else {
      Helper.showErrors(data, "notifications");
    }
  }

  render() {
    let notification = this.state.notification;
    if (!notification) {
      return null;
    }
    return (
      <div className="row faq-form notification-form">
        <div className="faq-form-container">
          <div className="form-title">
            {t("notifications.form.create_new")}
          </div>
          <div className="form-fields">
            <BasicInfo
              notification={notification}
              ref="basicInfo"/>
            <div className="row">
              <div className="col-md-10 form-group">
                <div className="row">
                  <ImageIcon className="form-section-icon" style={{color: theme.secondaryColor}}/>
                  <div className="form-section-title">
                    {t("notifications.attributes.file")}
                  </div>
                </div>
                <cm.FileUploader
                  defaultFiles={notification.attachments}
                  ref="fileUpload"/>
              </div>
            </div>
            <div className="row">
              <TeamList ref="teamList" defaultCheckedTeams={notification.teams}/>
            </div>
            <div className="row">
              <div className="col-md-10 form-group">
                <div className="row">
                  <ActionPermPhoneMsg className="form-section-icon"
                    style={{color: theme.secondaryColor}}/>
                  <div className="form-section-title">
                    {t("notifications.form.client_line")}
                  </div>
                </div>
                <div className="client-line-field">
                  <ClientLines
                    defaultChosenClientLines={notification["client_notification_lines"]}
                    ref="clientLine"/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10 form-group">
                <div className="row">
                  <AssignmentTurnedIn className="form-section-icon"
                    style={{color: theme.secondaryColor}}/>
                  <div className="form-section-title">
                    {t("notifications.form.tags")}
                  </div>
                </div>
                <div>
                  <Tags
                    defaultFaqTags={notification["notification_tags"]}
                    ref="tag"/>
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
                label={notification.id ? t("common.update") : t("common.create")}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
