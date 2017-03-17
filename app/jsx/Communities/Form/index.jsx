import FaqForm from "../../FaqForm"

export default class CommunityForm extends PageComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setToolBar(t("communities.title"));
  }

  render() {
    return (
      <FaqForm
        type="community"
        id={this.props.params.id}
        withoutAnswer={true}
      />
    );
  }
}
