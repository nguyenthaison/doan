import BaseAPI from "./BaseAPI";

export default class Flow extends BaseAPI {
  static get basePath() {
    return "flows";
  }
}
