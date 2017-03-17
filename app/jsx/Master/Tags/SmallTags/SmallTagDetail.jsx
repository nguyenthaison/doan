export default class TagDetail extends BaseMaster.Detail {
  renderPrimaryFields() {
    let parentTag = this.props.parent || {};
    let data = this.state.data;

    return (
      <div>
        {this.renderDataRow({name: t("master.small_tags.attributes.name"), value: data.name})}
        {this.renderDataRow({name: t("master.big_tags.attributes.name"), value: parentTag.name})}
        {this.renderDataRow("notes")}
      </div>
    );
  }
}
