export default class Image extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      src: this.props.src,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        src: nextProps.src,
      });
    }
  }

  handleErrorImage = () => {
    this.setState({
      src: this.props.defaultSrc,
    });
  }

  render() {
    return (
      <img src={this.state.src}
        onError={this.handleErrorImage}
      />
    );
  }
}
