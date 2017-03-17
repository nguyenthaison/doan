import BaseAPI from "./BaseAPI";

export default class Todo extends BaseAPI {
  static get basePath() {
    return "todos";
  }
}
