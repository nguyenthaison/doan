export default class TroubleNameDetail extends BaseMaster.Detail {
  renderPrimaryFields() {
    let data = this.state.data;

    return (
      <div>
        {this.renderDataRow({name: t("master.trouble_names.attributes.key"),
          value: t(`master.trouble_names.trouble_keys.${data.key}`)})
        }
        {this.renderDataRow("name")}
      </div>
    );
  }
}
