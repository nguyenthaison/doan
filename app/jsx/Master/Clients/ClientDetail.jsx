export default class ClientDetail extends BaseMaster.Detail {
  renderPrimaryFields() {
    let data = this.state.data;
    return (
      <div>
        {this.renderDataRow("code")}
        {this.renderDataRow("name")}
        {this.renderDataRow("name_kana")}
        {this.renderDataRow("short_name")}
        {this.renderDataRow("address")}
        {this.renderDataRow("phone_number")}
        {this.renderDataRow("notes")}
      </div>
    );
  }
}
