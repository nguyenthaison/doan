import BaseAPI from "./BaseAPI";

export default class Position extends BaseAPI {
  static get basePath() {
    return "positions";
  }
}
