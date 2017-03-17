export default class TroubleDetail extends BaseMaster.Detail {
  constructor(props) {
    super(props);

    this.deepKeyTrouble = ["big_trouble", "medium_trouble", "small_trouble", "tiny_trouble"];
  }

  renderTroubleContent(data) {
    let additionData = this.state.additionData;
    if (!additionData || additionData.deep == 0) return;
    let troubleRows = [];
    let tmpTrouble = data;
    let deep = additionData.deep;

    for (let i = deep - 1; i >= 0; i--) {
      let parentId = tmpTrouble.parent_id;
      tmpTrouble = additionData.troubles.filter(trouble => trouble.id === parentId)[0];
      troubleRows[i] = (
        this.renderDataRow({
          key: this.deepKeyTrouble[i],
          name: t(`master.troubles.attributes.${this.deepKeyTrouble[i]}`),
          value: tmpTrouble.name,
        })
      )
    }
    return troubleRows;
  }

  renderPrimaryFields() {
    let data = this.state.data;
    let deep = this.state.additionData.deep;

    return (
      <div>
        {this.renderDataRow({name: t("master.troubles.attributes.code"), value: data.code})}
        {this.renderTroubleContent(data)}
        {this.renderDataRow({name: t(`master.troubles.attributes.${this.deepKeyTrouble[deep]}`), value: data.name})}
      </div>
    );
  }
}
