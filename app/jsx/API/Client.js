import BaseAPI from "./BaseAPI";

export default class Client extends BaseAPI {
  static get basePath() {
    return "clients";
  }
}
