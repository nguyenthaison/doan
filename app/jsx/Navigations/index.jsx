import SearchForm from "./SearchForm";
import NavigationContent from "./NavigationContent";

export default class Navigation extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      navigation: null,
    };
  }

  get locationState() {
    return Helper.getCurrentLocationState();
  }

  componentDidMount() {
    this.setToolBar(t("navigations.title"));

    let locationState = this.props.location.state;
    if (locationState && locationState.line) {
      API.Navigation.getList(this.handleGetNavigationCallBack,
        this.getOptions(locationState.line))
    }
  }

  handleSubmitSearch = () => {
    let selectedLine = this.refs.searchForm.getSelectedLine();
    if (selectedLine) {
      API.Navigation.getList(this.handleGetNavigationCallBack, this.getOptions(selectedLine));
    } else {
      Helper.showAlert(t("common.confirmation"), t("navigations.warning"))
    }
  }

  getOptions(selectedLine) {
    let include = {
      client: {only: ["name"]},
      line: {only: ["name"]},
      navigation_steps: {include: {step: {only: ["name"]}}},
      todos: {include: {nodes: {}, parent_todo: {}, attachments: {}}},
    };

    let filter = {line_id: selectedLine.id};
    if (App.auth.role === "member") filter["published"] = true;

    return {
      filter: filter,
      include: JSON.stringify(include),
    }
  }

  handleUpdate = (todo) => {
    let navigation = update(this.state.navigation, {
      todos: {$push: [todo]}
    });
  }

  handleGetNavigationCallBack = (status, data) => {
    if (!status) return;

    App.navigation = data.navigations[0];

    this.setState({
      navigation: data.navigations[0],
    });
  }

  render() {
    let navigation = this.state.navigation;

    return (
      <div className="base-master-index navigation-master-detail">
        <div className="search-form">
          <SearchForm
            ref="searchForm"
            onSubmitSearch={this.handleSubmitSearch}
            defaultSelectedLine={this.locationState.line}
            defaultSelectedClient={this.locationState.client}
          />
        </div>
        {navigation ?
          <NavigationContent
            onlyView={true}
            key={navigation.id}
            ref="navigationContent"
            navigation={navigation}
            onUpdate={this.handleUpdate}
            defaultNavigationStep={navigation ? navigation.navigation_steps[0] : null}
          /> : <div className="no-record">{t("common.message.no_record")}</div>
        }
      </div>
    );
  }
}
