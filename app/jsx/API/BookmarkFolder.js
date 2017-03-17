import BaseAPI from "./BaseAPI";

export default class BookmarkFolder extends BaseAPI {
  static get basePath() {
    return "bookmark_folders";
  }
}
