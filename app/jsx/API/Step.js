import BaseAPI from "./BaseAPI";

export default class Step extends BaseAPI {
  static get basePath() {
    return "steps";
  }

  static updateAllStep(callback, steps) {
    this.sendAjax(callback, {
      url: "steps/update_all_steps",
      method: "POST",
      data: {
        steps: steps,
      }
    });
  }
}
