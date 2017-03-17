import BaseAPI from "./BaseAPI";

export default class ManualFile extends BaseAPI {
  static get basePath() {
    return "manual_files";
  }

  static create(callback, file) {
    this.sendAjax(callback, {
      url: "manual_files",
      method: "POST",
      processData: false,
      contentType: false,
      data: file
    });
  }

  static downLoad(callback, file) {
    this.sendAjax(callback, {
      url: "download",
      method: "GET",
      data: file
    });
  }
}
