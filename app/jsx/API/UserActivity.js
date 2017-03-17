import BaseAPI from "./BaseAPI";

export default class UserActivity extends BaseAPI {
  static get basePath() {
    return "user_activities";
  }
}
