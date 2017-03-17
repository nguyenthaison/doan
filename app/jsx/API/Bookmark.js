import BaseAPI from "./BaseAPI";

export default class Bookmark extends BaseAPI {
  static get basePath() {
    return "bookmarks";
  }
}
