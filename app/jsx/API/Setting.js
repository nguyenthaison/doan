import BaseAPI from "./BaseAPI";

export default class Setting extends BaseAPI {
  static get basePath() {
    return "settings";
  }
}
