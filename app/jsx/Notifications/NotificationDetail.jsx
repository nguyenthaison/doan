import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import CommentForm from "../Communities/CommentForm";
import NotificationNoteItem from "./NotificationNoteItem";
import ActionDelete from "material-ui/svg-icons/action/delete";
import NotificationCommentItem from "./NotificationCommentItem";
import ModeComment from 'material-ui/svg-icons/editor/mode-comment';

const styles = {
  backButton: {color: "white"},
}

export default class NotificationDetail extends PageComponent {
  constructor(props) {
    super(props);
    this.state = {
      notification: null,
      showNewNoteForm: false,
      showNewCommentForm: false,
      editingNoteId: null,
      editingCommentId: null,
    };
  }

  componentDidMount() {
    this.setToolBar(t("notifications.title"), "/notifications/new");
    let id = this.props.params.id;
    API.Notification.get(this.handleGetNotificationCallBack, id, this.getOptions());
  }

  getNotificationAddressNames() {
    let teams = this.state.notification.teams;
    let notificationAddressNames = "";
    teams.map((team, index) => {
      notificationAddressNames = notificationAddressNames.concat(team.name);
      if (index != teams.length -1) {
        notificationAddressNames = notificationAddressNames.concat(", ");
      }
    });
    return notificationAddressNames;
  }

  getExtendParams() {
    return {
      note: {
        "notification_id": this.state.notification.id
      },
      notificationComment: {
        "commentable_id": this.state.notification.id,
        "commentable_type": "Notification"
      }
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
    if (!status) return;
    this.setState({
      notification: data.notification,
    });
  }

  handleShowNewNoteForm = () => {
    this.setState({
      editingNoteId: null,
      showNewNoteForm: true,
    });
  }

  handleHideNoteForm = () => {
    this.setState({
      editingNoteId: null,
      showNewNoteForm: false,
    });
  }

  handleShowNewCommentForm = () => {
    this.setState({
      editingCommentId: null,
      showNewCommentForm: true,
    });
  }

  handleHideCommentForm = () => {
    this.setState({
      editingCommentId: null,
      showNewCommentForm: false,
    });
  }

  handleShowEditNoteForm = (note) => {
    let newState = update(this.state.editingNoteId, {$set: note.id});

    this.setState({
      showNewNoteForm: false,
      editingNoteId: newState,
    });
  }

  handleShowEditCommentForm = (comment) => {
    let newState = update(this.state.editingCommentId, {$set: comment.id});

    this.setState({
      showNewCommentForm: false,
      editingCommentId: newState,
    });
  }

  handleUpdateComment = (newComment, isCreate) => {
    this.handleHideCommentForm();

    let newNotification = null;

    if (isCreate) {
      newNotification = update(this.state.notification, {["comments"]: {$unshift: [newComment]}});
    } else {
      let index = this.state.notification.comments.findIndex(comment => comment.id === newComment.id);
      newNotification = update(this.state.notification, {comments: {[index]: {$set: newComment}}});
    }

    this.setState({
      notification: newNotification,
    });
  }

  handleUpdateListCommentAfterDelete = (comments) => {
    let newNotification = update(this.state.notification, {["comments"]: {$set: comments}});

    this.setState({
      notification: newNotification,
    });
  }

  handleUpdateNote = (newNote, isCreate) => {
    this.handleHideNoteForm();

    let newNotification = null;

    if (isCreate) {
      newNotification = update(this.state.notification, {["notes"]: {$unshift: [newNote]}});
    } else {
      let index = this.state.notification.notes.findIndex(note => note.id === newNote.id);
      newNotification = update(this.state.notification, {notes: {[index]: {$set: newNote}}});
    }

    this.setState({
      notification: newNotification,
    });
  }

  handleClickDelete = () => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.delete"),
      this.handleConfirmDelete);
  }

  handleConfirmDelete = () => {
    let notificationId = this.props.params.id;
    API.Notification.delete(this.handleDeleteCallback, notificationId);
  }

  handleDeleteCallback = (status, data) => {
    if (status) {
      Helper.transitionTo("/notifications");
      Helper.showMessage(t("common.message.deleted_success"));
    } else {
      Helper.showErrors(data);
    }
  }

  handleUpdateReadedUserCallBack = (status, data) => {
    if (!status) return;
    let newNotification = update(this.state.notification, {
      users: {$push: [data.user]},
      readed: {$set: true},
      count_readed_users: {$set: data.count_readed_users}
    });
    this.setState({
      notification: newNotification,
    });
  }

  handleUpdateNoteListAfterDelete = (deletedNote) => {
    let index = this.state.notification.notes.findIndex(note => note.id === deletedNote.id);
    let newNotification = update(this.state.notification, {["notes"]: {$splice: [[index, 1]]}});
    this.setState({
      notification: newNotification,
    });
  }

  handleClickReadedButton = () => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("notifications.detail.confirm_readed_message"),
      this.handleConfirmReaded);
  }

  handleConfirmReaded = () => {
    let notificationId = this.props.params.id;
    API.Notification.updateReadedUser(this.handleUpdateReadedUserCallBack, notificationId);
  }

  renderClientLineList() {
    let clienLines = this.state.notification["client_notification_lines"];
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

  renderTagList() {
    let notificationTags = this.state.notification["notification_tags"];
    return notificationTags.map((notificationTag, index) => {
      let childTagFormat = notificationTag.tag ? " > " + notificationTag.tag.name : "";
      return(
        <span key={index}>
          {notificationTag.parent_tag.name}
          {childTagFormat}
          {index != (notificationTags.length - 1) ? " , " : ""}
        </span>
      );
    })
  }

  renderNotificationNoteList() {
    let notes = this.state.notification.notes;
    return notes.map(note => {
      if (this.state.editingNoteId === note.id) {
        return (
          <CommentForm
            extendParams={this.getExtendParams().note}
            key={note.id}
            apiName={"NotificationNote"}
            withoutAttachment={true}
            maxLengthContent={2000}
            comment={note}
            onCancel={this.handleHideNoteForm}
            onSubmit={this.handleUpdateNote}/>
        );
      }
      return (
        <NotificationNoteItem
          onClickEdit={this.handleShowEditNoteForm}
          onClickDelete={this.handleUpdateNoteListAfterDelete}
          key={note.id}
          note={note} />
      );
    });
  }

  renderReadedUserList(readedUsers) {
    return readedUsers.map((user, index) => {
      return (
        <span key={user.id}>
          {user.name}
          {index != (readedUsers.length - 1) ? " , " : ""}
        </span>
      );
    });
  }

  renderAddNote() {
    return (
      <div className="row add-note" onClick={this.handleShowNewNoteForm}>
        <span className="col-md-12 pointer">
          <i className="material-icons">add_circle_outline</i>
          {t("notifications.detail.add_note")}
        </span>
      </div>
    );
  }

  renderBackButton() {
    return (
      <cm.RaisedButton
        primary={true}
        label={t("common.back")}
        onClick={() => Helper.history.goBack()}
        icon={<i className="material-icons">chevron_left</i>}
        style={styles.backButton}
      />
    );
  }

  renderEditButton() {
    return (
      <cm.RaisedButton
        secondary={true}
        icon={<ModeEdit />}
        className="btn-mr5"
        label={t("common.edit")}
        transitionTo={`/notifications/${this.state.notification.id}/edit`}
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

  renderCommentList() {
    let comments = this.state.notification.comments;
    return comments.map(comment => {
      if (this.state.editingCommentId === comment.id) {
        return (
          <CommentForm
            onSubmit={this.handleUpdateComment}
            onCancel={this.handleHideCommentForm}
            extendParams={this.getExtendParams().notificationComment}
            key={comment.id}
            apiName={"Comment"}
            withoutAttachment={true}
            comment={comment}/>
        );
      } else {
        return (
          <NotificationCommentItem
            onClickEdit={this.handleShowEditCommentForm}
            onChange={this.handleUpdateListCommentAfterDelete}
            key={comment.id}
            comment={comment} />
        );
      }
    });
  }

  renderReadedButton(notification) {
    return (
      <cm.RaisedButton
        disabled={notification.readed}
        primary={true}
        label={t("notifications.detail.readed")}
        onClick={this.handleClickReadedButton}/>
    );
  }

  render() {
    let notification = this.state.notification;
    if (!notification) {
      return null;
    }

    return(
      <div className="faq-detail-container notification-detail-container row">
        <div className="main-details">
          <div className="row panel panel-default">
            <div className="faq-infor-detail row">
              {this.renderBackButton()}
              <div className="faq-time-detail pull-right">
                <span>{t("faquestions.index.no_id")}{notification.id}</span>
                <span>{t("notifications.attributes.period")}:
                  {notification.start_date} - {notification.end_date}
                </span>
                <span>{t("common.attributes.created_at")}:{notification.created_at}</span>
                <span>
                  {notification.creator ? notification.creator.name : ""}
                </span>
              </div>
            </div>
            <div className="faq-title-detail row">
              <div className="faq-title">
                <label className={notification.priority + " priority-label"}>
                  <span>
                    {t("faquestions.attributes.priority")}:
                  </span>
                  {t(`notifications.priorities.${notification.priority}`)}
                </label>
                {notification.title}
              </div>
            </div>
            <div className="row content white-space">
              <cm.RegexLink text={notification.content} />
            </div>
            <cm.AttachmentList attachments={notification.attachments}/>
            <div className="row note-list">
              {this.renderNotificationNoteList()}
            </div>
            {notification.authorized.add_note ? this.renderAddNote() : null}
            <div className="row">

            </div>
            <div className="row">
              {this.state.showNewNoteForm ?
                <CommentForm
                  extendParams={this.getExtendParams().note}
                  apiName={"NotificationNote"}
                  withoutAttachment={true}
                  onCancel={this.handleHideNoteForm}
                  maxLengthContent={2000}
                  onSubmit={this.handleUpdateNote}/>
                  : null}
            </div>
            <div className="row center-button-list">
              <cm.RaisedButton
                label={t("comments.button.new_comment")}
                labelPosition="after"
                primary={true}
                onClick={this.handleShowNewCommentForm}
                icon={<ModeComment/>}/>
              {notification.authorized.readed ? this.renderReadedButton(notification) : null}
            </div>
            <div className="row">
              {this.state.showNewCommentForm ?
                <CommentForm
                  withoutAttachment={true}
                  extendParams={this.getExtendParams().notificationComment}
                  apiName={"Comment"}
                  onCancel={this.handleHideCommentForm}
                  onSubmit={this.handleUpdateComment}
                  />
                  : null}
            </div>
            <div className="row comment-list">
              {this.renderCommentList()}
            </div>
            <div className="other-info">
              <div className="row faq-troubles-detail">
                <div>
                  <i className="material-icons" style={{color: theme.secondaryColor}}>person_pin</i>
                </div>
                <div className="col-md-10">{this.getNotificationAddressNames()}</div>
              </div>
              <div className="row faq-client-lines-detail">
                <div>
                  <i className="material-icons" style={{color: theme.secondaryColor}}>perm_phone_msg</i>
                </div>
                <div className="col-md-10">{this.renderClientLineList()}</div>
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
              {notification.authorized.edit ? this.renderEditButton() : null}
              {notification.authorized.delete ? this.renderDeleteButton() : null}
            </div>
          </div>
        </div>
        <div className="related-items">
          <div className="row related-faqs smart-scroll">
            <div className="related-faqs-title" style={{background: theme.secondaryColor}}>
              <h4>
                <span>
                  {t("notifications.detail.readed_user_list")}:
                  {" "}
                  {notification.count_readed_users}/
                  {notification.count_received_users}
                </span>
              </h4>
            </div>
            <div className="related-faqs-content smart-scroll readed-users">
              {this.renderReadedUserList(notification.users)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
