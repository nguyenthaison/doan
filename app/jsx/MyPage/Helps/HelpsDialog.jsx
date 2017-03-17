import HelpList from "./HelpList";

const takeRecord = 20;

export default class HelpsDialog extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  open() {
    this.handleToggle();
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    let helps = this.props.helps;

    return (
      <cm.Dialog
        title={this.props.title}
        icon={<i className="material-icons">notifications_active</i>}
        onRequestClose={this.handleToggle}
        open={this.state.open}>
        <HelpList
          showBtnDone={false}
          helps={helps}
          type={this.props.type.toLowerCase()}
        />
      </cm.Dialog>
    );
  }
}

