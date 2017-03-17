import FaqForm from "../../FaqForm"

export default class FaquestionForm extends PageComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let titleToolBar = t("faquestions.title");
    if (this.props.params.comment_id) {
      titleToolBar = t("communities.title");
    }

    this.setToolBar(titleToolBar);
  }

  render() {
    return <FaqForm type="faq" id={this.props.params.id} commentId={this.props.params.comment_id}/>;
  }
}
