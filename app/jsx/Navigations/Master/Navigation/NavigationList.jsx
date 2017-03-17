import CreateNavigationDialog from "./CreateNavigationDialog";
import EditorModeEdit from "material-ui/svg-icons/editor/mode-edit";
import ContentCopy from "material-ui/svg-icons/content/content-copy";

export default class NavigationList extends BaseMaster.List {
  constructor(props) {
    super(props);

    this.apiName = "Navigation";
    this.tableName = "navigations";
    this.transPath = "navigations";
    this.iconHeader = "navigations";
    this.isShowHoverPointer = false;
    this.fields = [
      {name: "client_short_name", width: 1, transform: (item) => {return item.client.short_name}},
      {name: "client_line", width: 3, transform: (item) => {return item.client.name + ">" + item.line.name}},
      {name: "status", width: 2, transform: this.transformStatus}
    ];
  }

  getOptions() {
    let include = {
      client: {},
      line: {}
    };

    return {
      methods: ["published"],
      include: include,
    };
  }

  transformStatus = (item) => {
    if (item.published) return t("common.publish");
    return item.publish_date ? `${t("navigations.master.index.publish_time")}: ${item.publish_date}`
      : t("common.unpublish");
  }

  handleClickDetail = (data) => {
    return;
  }

  handleClickCreate = () => {
    this.refs.createNavigationDialog.openDialog();
  }

  handleClickEdit = (navigation) => {
    Helper.transitionTo("/masterNavigation/navigations/" + navigation.id);
  }

  handleCloneNavigation = (navigation) => {
    this.refs.createNavigationDialog.openDialog(navigation);
  }

  handleClickViewNavigation = (navigation) => {
    Helper.transitionTo("/navigations", {line: navigation.line, client: navigation.client})
  }

  renderItemButtonGroup(item) {
    return (
      <div className="td btn-group text-align-left navigation-group-btn">
        <cm.RaisedButton
          className="btn-mr5"
          label={t("common.edit")}
          secondary={true}
          icon={<EditorModeEdit />}
          onClick={() => this.handleClickEdit(item)} />
        <cm.RaisedButton
          className="btn-mr5"
          label={t("common.copy")}
          secondary={true}
          icon={<ContentCopy />}
          onClick={() => this.handleCloneNavigation(item)} />
        {item.published ?
          <cm.RaisedButton
          className="btn-mr5"
          label={t("navigations.master.index.view_navigation")}
          primary={true}
          onClick={() => this.handleClickViewNavigation(item)} />
        : null}
      </div>
    );
  }

  renderDialogs() {
    return (
      <CreateNavigationDialog ref="createNavigationDialog" />
    );
  }
}
