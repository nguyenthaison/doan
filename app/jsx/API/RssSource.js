import BaseAPI from "./BaseAPI";

export default class RssSource extends BaseAPI {
  static get basePath() {
    return "rss_sources";
  }
}
