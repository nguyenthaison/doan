import FaquestionItem from "../FaqList/FaquestionItem";

export default class FaqList extends BaseComponent {
  constructor(props) {
    super(props);
  }

  renderFaqComList() {
    let list = this.props.list;
    if (list.length === 0)
      return <div className="no-record">{t("common.message.no_record")}</div>;

    return list.map(item =>
      <div className="table-row-striped"
        key={item.id}
        onClick={() => Helper.transitionTo(this.props.basePath + item.id)}>
        <FaquestionItem page={true} faquestion={item} />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderFaqComList()}
      </div>
    );
  }
}
