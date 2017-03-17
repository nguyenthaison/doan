import FaqList from "./FaqList";

const pluralize = require("pluralize");
const takeRecord = 20;

export default class ListDialog extends BaseComponent {
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
    let list = this.props.list;

    return (
      <cm.Dialog
        title={this.props.title}
        icon={<i className="material-icons">{this.props.icon}</i>}
        onRequestClose={this.handleToggle}
        open={this.state.open}
      >
        <FaqList
          list={list}
          type={this.props.type.toLowerCase()}
          basePath={this.props.basePath}
        />
      </cm.Dialog>
    );
  }
}
