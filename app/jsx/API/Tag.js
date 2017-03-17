import BaseAPI from "./BaseAPI";

export default class Tag extends BaseAPI {
  static get basePath() {
    return "tags";
  }

  static batchUpdate(callback, data) {
    this.sendAjax(callback, {
      url: "tags",
      method: "PATCH",
      data: {
        data: data,
      },
    });
  }
}
