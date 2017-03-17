import {Link} from 'react-router';
import EditorModeComment from 'material-ui/svg-icons/editor/mode-comment';
export default class NotificationItem extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    let notification = this.props.notification;
    Helper.transitionTo(`/notifications/${notification.id}`);
  }

  getNotificationAddressNames() {
    let teams = this.props.notification.teams;
    let notificationAddressNames = "";
    teams.map((team, index) => {
      notificationAddressNames = notificationAddressNames.concat(team.name);
      if (index != teams.length - 1) {
        notificationAddressNames = notificationAddressNames.concat(", ");
      }
    });
    return notificationAddressNames;
  }

  render() {
    let notification = this.props.notification;
    let comment_count = notification.comment_count;
    let splitedContent = notification.content.split('\n');
    let teamNames = this.getNotificationAddressNames();

    return(
      <div
        onClick={this.handleClick}
        className={"faq-item pointer row " + this.props.backgroundClassName}>
        <div className="faq-body">
          <div className="faq-header">
            <span className="left-infor">
              <label>{t("faquestions.index.no_id")}{notification.id}</label>
              <label>
                {t("notifications.attributes.period")}:
                {notification.start_date} - {notification.end_date}
              </label>
            </span>
            <span className="right-infor">
              <label>{t("common.attributes.created_at")}:{notification.created_at}</label>
              <label>
                <i className="material-icons" style={{color: theme.secondaryColor}}>account_circle</i>
                {notification.creator.name  || ""}
              </label>
            </span>
          </div>
          <div className="faq-title row">
            <label className={notification.priority + " priority-label col-md-2"}>
              <span>
                {t("notifications.attributes.priority")}:
              </span>
              {t(`notifications.priorities.${notification.priority}`)}
            </label>
            <div
              title={notification.title}
              className="ellipsis-text faq-title-content col-md-8"
              dangerouslySetInnerHTML={{__html: notification.title.escape().replace(/ /gi, '&nbsp;')}}
              >
            </div>
            <div className="col-md-3 faq-reaction pull-right">
              <div className="reaction-item reaction-comment">
                <span title={comment_count}>
                  <EditorModeComment />
                  <span>{t("communities.index.comment")} </span>
                  {comment_count < 1000 ? comment_count : "999+"}
                </span>
              </div>
            </div>
          </div>
          <div
            className="col-md-9 faq-question-content ellipsis-text"
            title={notification.content}
            dangerouslySetInnerHTML={{
              __html: splitedContent[0].trim().escape().replace(/ /gi, '&nbsp;')
                + (splitedContent.length > 1 ? "..." : "")
            }}
            >
          </div>
          {notification.has_note ?
            <div className="has-note pull-right">
              <i className="material-icons" style={{color: theme.secondaryColor}}>library_books</i>
              {t("notifications.index.has_note")}
            </div>
            : null}
        </div>
        <div className="clearfix"></div>
        <div className="list-team-name">
          <div className="ellipsis-text" title={teamNames}>
            <i className="material-icons" style={{color: theme.secondaryColor}}>person_pin</i>
            {teamNames}
          </div>
        </div>
      </div>
    );
  }
}
