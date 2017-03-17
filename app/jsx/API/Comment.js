import BaseAPI from "./BaseAPI";

export default class Comment extends BaseAPI {
  static create(callback, comment) {
    this.sendAjax(callback, {
      url: "comments",
      method: "POST",
      data: {
        comment: comment,
      },
    });
  }

  static update(callback, comment) {
    this.sendAjax(callback, {
      url: `comments/${comment.id}`,
      method: "PATCH",
      data: {
        comment: comment
      },
    });
  }

  static delete(callback, comment) {
    this.sendAjax(callback, {
      url: `comments/${comment.id}`,
      method: "DELETE"
    });
  }

  static updateReaction(callback, comment) {
    this.sendAjax(callback, {
      url: `comments/${comment.id}/update_reaction`,
      method: "POST"
    });
  }
}
