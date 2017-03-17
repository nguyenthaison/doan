import BaseAPI from "./BaseAPI";

export default class Feed extends BaseAPI {
  static get basePath() {
    return "feeds";
  }
}
