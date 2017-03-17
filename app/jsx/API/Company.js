import BaseAPI from "./BaseAPI";

export default class Company extends BaseAPI {
  static get basePath() {
    return "companies";
  }
}
