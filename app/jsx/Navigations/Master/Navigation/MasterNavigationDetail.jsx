import ListHeader from "../../../Master/BaseMaster/ListHeader";
import NavigationContent from "../../NavigationContent";
import ActionDelete from "material-ui/svg-icons/action/delete";
import PublishDialog from "./PublishDialog";

export default class MasterNavigationDetail extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      navigation: null,
    };
  }

  componentDidMount() {
    this.setToolBar(t("navigations.header_title"));
    API.Navigation.get(this.handleGetNavigationCallBack, this.props.params.id, this.getOptions());
  }

  getOptions() {
    let include = {
      client: {only: ["name"]},
      line: {only: ["name"]},
      navigation_steps: {include: {step: {only: ["name"]}}},
      todos: {include: {nodes: {}, parent_todo: {}, attachments: {}}},
    };

    return {
      methods: ["published"],
      include: JSON.stringify(include),
    }
  }

  handleGetNavigationCallBack = (status, data) => {
    if (!status) return;

    let navigation = data.navigation;
    App.navigation = navigation;

    this.setState({
      navigation: navigation,
    });
  }

  handleUpdate = (navigation) => {
    this.setState({
      navigation: navigation,
    });
  }

  handleClickDelete = () => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.delete"),
      this.handleConfirmDelete);
  }

  handleConfirmDelete = () => {
    API.Navigation.delete(this.handleDeleteCallback, this.state.navigation.id);
  }

  handleDeleteCallback = (status, data) => {
    if (status) {
      Helper.transitionTo("/masterNavigation/navigations");
      Helper.showMessage(t("common.message.deleted_success"));
    } else {
      Helper.showErrors(data);
    }
  }

  handleClickPublish = () => {
    this.refs.publishDialog.open();
  }

  handleClickUnpublish = () => {
    API.Navigation.update(this.handleUpdateNavigationCallback,
      {id: this.props.params.id, publish_date: null});
  }

  handleSavePublishOption = (option) => {
    let publishDate = this.refs.publishDialog.getPublishDate();

    API.Navigation.update(this.handleUpdateNavigationCallback,
      {id: this.props.params.id, publish_date: publishDate});
  }

  handleUpdateNavigationCallback = (status, data) => {
    if (status) {
      let navigation = update(this.state.navigation, {published: {$set: data.published}});

      this.setState({
        navigation: navigation,
      });

      Helper.transitionTo("/masterNavigation/navigations");
      Helper.showMessage(t("common.message.updated_success"));
    } else {
      Helper.showErrors(data.navigation, "navigations");
    }
  }

  renderActionHeader() {
    let navigation = this.state.navigation;

    return (
      <div>
        <cm.RaisedButton
          secondary={true}
          label={t("navigations.buttons.temp_save")}
          onClick={() => Helper.transitionTo("/masterNavigation/navigations")}
          icon={<i className="material-icons">chevron_left</i>}
          style={{color: "white"}}
        />
        <cm.RaisedButton
          className="btn-create"
          label={navigation.published ? t("common.unpublish") : t("common.publish")}
          secondary={true}
          onTouchTap={navigation.published ? this.handleClickUnpublish : this.handleClickPublish}
        />
      </div>
    );
  }

  render() {
    if (!this.state.navigation) return null;

    let navigation = this.state.navigation;
    let icon = <i className="material-icons icon-header">navigation</i>;

    return (
      <div className="base-master-index navigation-master-detail">
        <ListHeader
          className="ellipsis-text list-header-navigation"
          icon={icon}
          title={navigation.client.name + " > " + navigation.line.name}>
          {this.renderActionHeader()}
        </ListHeader>
        <div>
          <NavigationContent
            ref="navigationContent"
            navigation={navigation}
            defaultNavigationStep={navigation.navigation_steps[0]}
            onUpdate={this.handleUpdate}
            locationState={this.props.location.state || {}}
          />
          <cm.RaisedButton
            icon={<ActionDelete />}
            className="btn-delete pull-right"
            label={t("common.delete")}
            onClick={this.handleClickDelete}
          />
        </div>
        <PublishDialog
          ref="publishDialog"
          publishDate={this.state.navigation.publish_date}
          onSavePublishOption={this.handleSavePublishOption}
        />
      </div>
    );
  }
}
