import BaseAPI from "./BaseAPI";

export default class Claim extends BaseAPI {
  static get basePath() {
    return "claims";
  }
}
