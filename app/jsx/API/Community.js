import BaseAPI from "./BaseAPI";

export default class Community extends BaseAPI {
  static get basePath() {
    return "communities";
  }

  static updateReaction(callback, reaction, faqId) {
    this.sendAjax(callback, {
      url: `communities/${faqId}/update_${reaction}`,
      method: "POST"
    });
  }
}
