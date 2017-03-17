import BaseAPI from "./BaseAPI";

export default class Line extends BaseAPI {
  static get basePath() {
    return "lines";
  }
}
