import BaseAPI from "./BaseAPI";

export default class Navigation extends BaseAPI {
  static get basePath() {
    return "navigations";
  }

  static importFlow(callback, navigationId, navigationStepId, flowId, parentTodoId, nodeId) {
    this.sendAjax(callback, {
      url: `navigations/${navigationId}/import_flow`,
      method: "POST",
      data: {
        flow_id: flowId,
        navigation_step_id: navigationStepId,
        parent_todo_id: parentTodoId,
        node_id: nodeId,
      }
    });
  }
}
