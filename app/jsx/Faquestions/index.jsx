import FaquestionsList from "../FaqList/";

export default class Faquestions extends PageComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let authorizedPages  = App.auth.authorized_pages;
    this.setToolBar(t("faquestions.title"),
      authorizedPages.faqs && authorizedPages.faqs.new ? "/faqs/new" : "");
  }

  render() {
    let locationState = Helper.getCurrentLocationState();
    return (
      <div>
        <FaquestionsList
          type="faq"
          withComment={false}
          locationState={locationState}
          listName="faquestions"
        />
      </div>
    );
  }
}
