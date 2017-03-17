import BaseAPI from "./BaseAPI";

export default class Faquestion extends BaseAPI {
  static get basePath() {
    return "faquestions";
  }

  static updateReaction(callback, reaction, faqId) {
    this.sendAjax(callback, {
      url: `faquestions/${faqId}/update_${reaction}`,
      method: "POST"
    });
  }

  static getDataForCloning(callback, commentId, options = {}) {
    this.sendAjax(callback, {
      url: "faquestions/get_data_for_cloning",
      data: {
        comment_id: commentId,
        data: options,
      }
    })
  }
}
