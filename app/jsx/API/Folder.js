import BaseAPI from "./BaseAPI";

export default class Folder extends BaseAPI {
  static get basePath() {
    return "folders";
  }
}
