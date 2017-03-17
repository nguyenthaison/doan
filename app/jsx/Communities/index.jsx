import FaquestionsList from "../FaqList/";

export default class Communities extends PageComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setToolBar(t("communities.title"), "/communities/new");
  }

  render() {
    let locationState = Helper.getCurrentLocationState();
    return (
      <div>
        <FaquestionsList
          type="community"
          withComment={true}
          locationState={locationState}
          listName="communities"
        />
      </div>
    );
  }
}
