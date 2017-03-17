import ClaimList from "../Master/Claims/ClaimList";

export default class ClaimDialog extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    }
  }

  open = () => {
    this.setState({
      show: true,
    });
  }

  close = () => {
    this.setState({
      show: false,
    });
  }

  handleClose = () => {
    this.close();
  }

  render() {
    return (
      <div>
        <cm.Dialog
          title={t("navigations.master.claims")}
          className="base-master-dialog-index"
          contentClassName="dialog-content"
          onRequestClose={this.handleClose}
          open={this.state.show}>
            <ClaimList showButtonEditAndDelete={false} />
        </cm.Dialog>
      </div>
    );
  }
}
