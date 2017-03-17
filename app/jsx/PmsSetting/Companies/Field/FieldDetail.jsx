export default class FieldDetail extends BaseMaster.Detail {
  constructor(props) {
    super(props);
  }

  renderRssSource(data) {
    if (!data.rss_sources) return;

    let rss_sources = data.rss_sources;
    rss_sources = rss_sources.filter(rss_source => !rss_source._destroy);

    return rss_sources.map((rss_source, index) => {
      return (
        <div key={index} className="row detail-row">
          <div className="col-label">
            {t("pms.rss_sources.rss")} ({index + 1})
          </div>
          <div>
            <div className="col-label item">{t("pms.rss_sources.attributes.title")}</div>
            <div className="col-value item">{rss_source.title}</div>
          </div>
          <div>
            <div className="col-label item">{t("pms.rss_sources.attributes.url")}</div>
            <div className="col-value item">{rss_source.url}</div>
          </div>
        </div>
      )
    })
  }

  renderPrimaryFields() {
    let data = this.state.data;
    let contractPeriod = Helper.formatDateRange(data["contract_start_date"], data["contract_end_date"]);

    return (
      <div>
        {this.renderDataRow("name")}
        {this.renderDataRow({name: t("pms.fields.attributes.contract_period"),
          value: contractPeriod})}
        {this.renderDataRow("style")}
        {/*this.renderDataRow({name: t("pms.attachment.big_logo"),
          value: <img src={data.attachments[0].thumb_url} />})*/}
        {/*this.renderDataRow({name: t("pms.attachment.small_logo"),
          value: <img src={data.small_attachments[0].thumb_url} />})*/}
        {this.renderRssSource(data)}
      </div>
    );
  }
}
