import NotificationAddressDetail from "./NotificationAddressDetail";
import NotificationAddressForm from "./NotificationAddressForm";

export default class NotificationAddresses extends BaseMaster.List {
  constructor(props) {
    super(props);
    this.apiName = "NotificationAddress";
    this.tableName = "notification_addresses";
    this.transPath = "master.notifications";
    this.iconHeader = "notifications_active";
    this.fields = [
      {name: "notification_type", width: 2, transform: (item) => {
        return t(`master.notifications.type.${item.notification_type}`)
      }},
      {name: "user", width: 2, transform: (item) => {return item.user.name}},
      {name: "teams", width: 3, transform: (item) => {
        let teamManagement = item.teams.map(team => {
          return team.name;
        })
        return teamManagement.toString();
      }},
    ];
    this.objectDetail = NotificationAddressDetail;
    this.objectForm = NotificationAddressForm;
  }

  getOptions() {
    return {
      include: {
        user: {only: ["id", "name"]},
        teams: {
          only: ["id", "name"],
          include: {
            department: {
              only: ["id", "name"],
              include: {
                organization: {only: ["id", "name"]},
              }
            },
          }
        }
      }
    }
  }
}
