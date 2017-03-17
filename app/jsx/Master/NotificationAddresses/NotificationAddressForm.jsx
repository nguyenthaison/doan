const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

import NavigationClose from "material-ui/svg-icons/navigation/close";
import ContentSave from "material-ui/svg-icons/content/save";
import NotificationAddressDetail from "./NotificationAddressDetail";
import FieldTeam from "../../Company/Field/FieldTeam";

export default class NotificationAddressForm extends BaseMaster.Form {
  constructor(props) {
    super(props);
    this.apiName = "NotificationAddress";
    this.objectDetail = NotificationAddressDetail;
    this.defaultData = Object.keys(this.state.data).length === 0 ? {notification_type: "help"} :
      this.state.data;

    this.state = update(this.state, {$merge: {
      users: [],
    }});

  }

  componentDidMount() {
    API.User.getList(this.handleGetListUserCallback, {
      filter: {
        has_email: true,
      },
    });
  }

  handleGetListUserCallback = (status, data)  => {
    if (!status) return;

    let newState = update(this.state, {users: {$set: data.users}});
    this.setState(newState);
  }

  getDataForSubmit() {
    let data = this.state.data;
    let selectedTeamIds = this.refs.fieldTeam.getSelectedTeamIds();
    let newData = update(data, {
      notification_address_teams_attributes: {$set: selectedTeamIds},
      teams: {$set: this.refs.fieldTeam.getChosenTeams()},
    });

    return newData;
  }

  renderRadioButton() {
    let noticeType = ["help", "notification"];

    return noticeType.map((type, index) => {
      return (
        <mui.RadioButton
          key={index}
          className="notice-type"
          value={type}
          label={t(`master.notifications.type.${type}`)}
          style={styles.radioButton}
        />
      );
    })
  }

  renderNotificationType() {
    return (
      <div className="wp-notice-type">
        {this.renderLabel(t("master.notifications.type.title"), true)}
        <mui.RadioButtonGroup
          className="notice-type1-container"
          name="notice-type"
          valueSelected={this.state.data.notification_type}
          onChange={(event, value) => this.handleChangeTextField("notification_type", value)}
        >
          {this.renderRadioButton()}
        </mui.RadioButtonGroup>
      </div>
    );
  }

  renderDialogContent() {
    let data = this.state.data;
    let errorSelectTeam = this.state.errors.notification_address_teams;

    return(
      <div className="notice-address-form">
        {this.renderNotificationType()}
        {this.renderSelectField("user", data.user_id, this.state.users, {
          required: true,
        })}
        <div>
          <div className="team-label">
            <i className="material-icons form-icon">supervisor_account</i>
            <span className="label-name">
              {this.renderLabel(t("company.fields.team"), true)}
            </span>
          </div>
          <div className="error-message" style={{color: "red", fontSize: "12px"}}>
            {errorSelectTeam ? errorSelectTeam[0] : ""}
          </div>
          <FieldTeam
            ref="fieldTeam"
            defaultTeams={data.teams}
          />
        </div>
      </div>
    )
  }
}
