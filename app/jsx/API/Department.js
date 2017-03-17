import BaseAPI from "./BaseAPI";

export default class Department extends BaseAPI {
  static get basePath() {
    return "departments";
  }
}
