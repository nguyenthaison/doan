import BaseAPI from "./BaseAPI";

export default class NotificationNote extends BaseAPI {
  static create(callback, note) {
    this.sendAjax(callback, {
      url: "notification_notes",
      method: "POST",
      data: {
        notification_note: note,
      },
    });
  }

  static update(callback, note) {
    this.sendAjax(callback, {
      url: `notification_notes/${note.id}`,
      method: "PATCH",
      data: {
        notification_note: note
      },
    });
  }

  static delete(callback, note) {
    this.sendAjax(callback, {
      url: `notification_notes/${note.id}`,
      method: "DELETE"
    });
  }
}
