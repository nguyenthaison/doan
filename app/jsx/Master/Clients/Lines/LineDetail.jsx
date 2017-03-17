export default class LineDetail extends BaseMaster.Detail {
  getUniqueLineTroubles(deep, parentId) {
    let troubleDeepKeys = ["big_trouble", "medium_trouble", "small_trouble", "tiny_trouble"];
    let lineTroubles = this.state.data.line_troubles;
    let currentDeepKey = troubleDeepKeys[deep];
    let arrayTrouble = [];
    if (lineTroubles) {
      lineTroubles.map((lineTrouble) => {
        if (lineTrouble[currentDeepKey] &&
          lineTrouble[currentDeepKey].parent_id === parentId &&
          arrayTrouble.findIndex((trouble) => trouble.id === lineTrouble[currentDeepKey].id) === -1
        ) {
          arrayTrouble.push(lineTrouble[troubleDeepKeys[deep]]);
        }
      });
    }
    return arrayTrouble;
  }

  renderTroubleList(deep, parentId) {
    if (deep >= 4) {
      return;
    }
    let uniqueLineTrouble = this.getUniqueLineTroubles(deep, parentId);
    let rightSide = 100 - (deep * 25);
    let leftWidth = (25 / rightSide) * 100;
    let rightWidth = 100 - leftWidth;

    return uniqueLineTrouble.map((trouble) => {
      return (
        <div className="trouble-item" key={trouble.id}>
          <div className="pull-left left-side" style={{width: leftWidth + "%"}}>
            {trouble.name}
          </div>
          <div className="pull-right" style={{width: rightWidth + "%"}}>
            {this.renderTroubleList(deep + 1, trouble.id)}
          </div>
          <div className="clearfix"></div>
        </div>
      )
    })
  }

  renderTroubleTable() {
    let troubleList = this.renderTroubleList(0, 0);
    if (troubleList.length === 0) return;
    return(
      <div className="trouble-table">
        {troubleList}
      </div>
    )
  }

  renderPrimaryFields() {
    let client = this.props.parent || {};
    let data = this.state.data;

    return (
      <div className="master-line-detail">
        {this.renderDataRow("code")}
        {this.renderDataRow("name")}
        {this.renderDataRow("name_kana")}
        {this.renderDataRow("free_dial_number")}
        {this.renderDataRow({name: t("master.lines.attributes.client_name"), value: client.name})}
        {this.renderDataRow("notes")}
        <div className="row detail-row">
          {t("master.troubles.title")}
          {this.renderTroubleTable()}
        </div>
      </div>
    );
  }
}
