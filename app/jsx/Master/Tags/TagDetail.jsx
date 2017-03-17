export default class TagDetail extends BaseMaster.Detail {
  renderPrimaryFields() {
    let data = this.state.data;

    return (
      <div>
        {this.renderDataRow({name: t("master.big_tags.attributes.name"), value: data.name})}
        {this.renderDataRow("notes")}
      </div>
    );
  }
}
