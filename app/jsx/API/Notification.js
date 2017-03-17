import BaseAPI from "./BaseAPI";

export default class Notification extends BaseAPI {
  static get basePath() {
    return "notifications";
  }

  static updateReadedUser(callback, notificationId) {
    this.sendAjax(callback, {
      url: `notifications/${notificationId}/update_readed_user`,
      method: "POST"
    });
  }
}
