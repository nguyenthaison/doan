import BaseAPI from "./BaseAPI";

export default class Organization extends BaseAPI {
  static get basePath() {
    return "organizations";
  }
}
