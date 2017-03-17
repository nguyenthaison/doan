import FieldDetail from "./FieldDetail";
import FieldForm from "./FieldForm";

export default class Field extends BaseMaster.ListDialog {
  constructor(props) {
    super(props);
    this.apiName = "Field";
    this.tableName = "fields";
    this.transPath = "pms.fields";
    this.fields = [
      {name: "name", width: 3},
      {name: "contract_period", width: 4, transform: (item) => {
        return Helper.formatDateRange(item["contract_start_date"], item["contract_end_date"])
      }},
    ];
    this.objectDetail = FieldDetail;
    this.objectForm = FieldForm;
  }

  getOptions() {
    return {
      filter: {
        company_id: this.parent ? this.parent.id : null,
      },
      include: {
        rss_sources: {
          only: ["id", "url", "title", "field_id"],
        },
        attachments: {},
        small_attachments: {},
      }
    }
  }
}
