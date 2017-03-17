export default class PositionsDetail extends BaseMaster.Detail {
  renderPrimaryFields() {
    let data = this.state.data;

    return (
      <div>
        {this.renderDataRow("name")}
        {this.renderDataRow("notes")}
      </div>
    );
  }
}
