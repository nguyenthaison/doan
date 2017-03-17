import BaseAPI from "./BaseAPI";

export default class Team extends BaseAPI {
  static get basePath() {
    return "teams";
  }
}
