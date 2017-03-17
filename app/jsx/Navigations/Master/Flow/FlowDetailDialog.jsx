import NavigationContent from "../../NavigationContent";
import FlowDetail from "./FlowDetail";

export default class FlowDetailDialog extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
    }
  }

  close = () => {
    this.setState({
      openDialog: false,
    });
  }

  open = (flow) => {
    this.flow = flow;

    this.setState({
      openDialog: true,
    });
  }

  handleImportFlow = () => {
    this.props.onSubmit(this.flow);
  }

  render() {
    return (
      <div>
        <cm.Dialog
          title={t("flows.detail.title_dialog")}
          icon={<i className="material-icons">donut_large</i>}
          onRequestClose={this.close}
          open={this.state.openDialog}
          className="base-master-dialog-index flow-detail-dialog"
          contentClassName="dialog-content flow-detail-content"
        >
          <FlowDetail
            onImport={this.handleImportFlow}
            onClose={this.close}
            flow={this.flow} />
        </cm.Dialog>
      </div>
    );
  }
}
