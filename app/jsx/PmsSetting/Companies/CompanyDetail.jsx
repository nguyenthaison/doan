export default class CompanyDetail extends BaseMaster.Detail {
  convertDate(date) {
    return date.toLocaleDateString("ja-JP").replace(/\//g,"-");
  }

  renderPrimaryFields() {
    return (
      <div>
        {["name", "name_kana", "postal_code", "address", "phone_number", "fax",
          "billing_address", "phone_number_billing", "fax_billing", "name_PIC",
          "name_kana_PIC", "name_PIC_billing", "name_kana_PIC_billing"].map((attribute, key) =>
          {
            return this.renderDataRow(attribute, key);
          })
        }
        {this.renderDataRow("notes")}
      </div>
    )
  }
}
