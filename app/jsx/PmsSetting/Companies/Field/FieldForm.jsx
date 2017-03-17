import FieldDetail from "./FieldDetail";
import RssSource from "./RssSource";
import AddCircleOutline from "material-ui/svg-icons/content/add-circle-outline";
import ContractPeriod from "./ContractPeriod";

const MAX_RSS_SOURCE = 2;

export default class FieldForm extends BaseMaster.Form {
  constructor(props) {
    super(props);
    this.apiName = "Field";
    this.defaultData = {company_id: this.props.parent.id};
    this.objectDetail = FieldDetail;
  }

  getDataForSubmit() {
    let attachmentBigLogoIds = this.refs.fileUploadBigLogo.getAttachmentIds();
    attachmentBigLogoIds = attachmentBigLogoIds.length > 0 ? attachmentBigLogoIds : [""];
    let attachmentSmallLogoIds = this.refs.fileUploadSmallLogo.getAttachmentIds();
    attachmentSmallLogoIds = attachmentSmallLogoIds.length > 0 ? attachmentSmallLogoIds : [""];
    let data = this.state.data;
    let style = data.style || "green";
    let newData = update(data, {
      rss_sources_attributes: {$set: this.state.data.rss_sources},
      attachment_ids: {$set: attachmentBigLogoIds},
      small_attachment_ids: {$set: attachmentSmallLogoIds},
      style: {$set: style},
    });

    return newData;
  }

  handleShowNewInputRss = () => {
    let rssSources = this.state.data.rss_sources || [];
    let countRssSource = rssSources.filter(rssSource => !rssSource._destroy).length;

    if (countRssSource >= MAX_RSS_SOURCE) return;

    rssSources = update(rssSources, {$push: [{field_id: this.state.data.id}]});
    let data = update(this.state.data, {rss_sources: {$set: rssSources}});

    this.setState({
      data: data,
    });
  }

  handleChangeText = (index, fieldName, value) => {
    let rssSources = this.state.data.rss_sources;
    rssSources = update(rssSources, {[index]: {[fieldName]: {$set: value}}});
    let data = update(this.state.data, {rss_sources: {$set: rssSources}});

    this.setState({
      data: data,
    });
  }

  handleChangePeriod = (fieldName, date = null) => {
    let data = this.state.data;
    data = update(data, {[fieldName]: {$set: date}});

    this.setState({
      data: data,
    })
  }

  handleRemoveRss = (index) => {
    let rssSources = this.state.data.rss_sources;
    rssSources = update(rssSources, {[index]: {_destroy: {$set: true}}});
    let data = update(this.state.data, {rss_sources: {$set: rssSources}});

    this.setState({
      data: data,
    });
  }

  renderInputRssSource() {
    let data = this.state.data;
    let rssSources = data.rss_sources || [];
    let errors = this.state.errors;

    return rssSources.map((rssSource, index) => {
      if (rssSource._destroy) return;
      return (
        <RssSource
          key={index}
          ref="rssSource"
          errors={rssSource.url && rssSource.title ? {} :  errors}
          onRemoveRss={() => this.handleRemoveRss(index)}
          rssSource={rssSource}
          onChange={(fieldName, value) => this.handleChangeText(index, fieldName, value)}
        />
      )
    });
  }

  renderStyle() {
    return ["pink" ,"green", "blue"].map((style, index) => {
      let label = (
        <div>
          <div style={{float: "left", paddingRight: "15px"}}>{t(`pms.fields.${style}`)}</div>
          <div style={{background: style, width: "20px", height: "20px", float: "left"}}></div>
        </div>
      );
      return (
        <mui.RadioButton
          className="style-item"
          key={index}
          value={style}
          label={label}
          style={{width: "95%"}}
        />
      );
    });
  }

  renderFieldStyle() {
    return(
      <div>
        <div className="rss-feed-title">
          <h4>
            <span>{t("pms.fields.attributes.style")}</span>
            <span className="required">{t("common.required")}</span>
          </h4>
        </div>
        <mui.RadioButtonGroup
          className="notice-type1-container"
          name="notice-type"
          style={{display: "inline-flex"}}
          valueSelected={this.state.data.style || "pink"}
          onChange={(event, value) => this.handleChangeTextField("style", value)}>
          {this.renderStyle()}
        </mui.RadioButtonGroup>
      </div>
    );
  }

  renderUpLoadLogoField(ref, attachment, note, label) {
    return (
      <div>
        <div className="rss-feed-title">
          <h4>
            <i className="material-icons" style={{color: theme.secondaryColor}}>panorama</i>
            <span>{label}</span>
            <span className="note-small">({note})</span>
          </h4>
        </div>
        <cm.FileUploader ref={ref} defaultFiles={attachment} numberUploadFile={1} />
      </div>
    );
  }

  renderRssSource() {
    let rssSources = this.state.data.rss_sources || [];
    let countRssSource = rssSources.filter(rssSource => !rssSource._destroy).length;

    return (
      <div>
        <div className="rss-feed-title">
          <h4>
            <i className="material-icons" style={{color: theme.secondaryColor}}>rss_feed</i>
            <span>{t("top.feed.title")}</span>
            <span className="note-small">({t("pms.rss_sources.note")})</span>
          </h4>
        </div>
        <div>
          {this.renderInputRssSource()}
        </div>
        <div>
          {countRssSource >= MAX_RSS_SOURCE ? "" :
            <cm.RaisedButton
              icon={<AddCircleOutline />}
              className="add-new-rss"
              label={t("pms.rss_sources.add_new")}
              primary={true}
              onClick={this.handleShowNewInputRss}
            />
          }
        </div>
      </div>
    );
  }

  renderDialogContent() {
    let errors = this.state.errors;
    let data = this.state.data;

    return(
      <div className="rss-form">
        {this.renderTextInput("name", {
          maxLength: 40,
          required: true,
        })}
        <div className="rss-feed-title">
          <h4>
            <span>{t("pms.fields.title")}</span>
            <span className="required">{t("common.required")}</span>
          </h4>
        </div>
        {<ContractPeriod
          onChange={this.handleChangePeriod}
          data={data}
          errors={errors}
          />}
        {this.renderFieldStyle()}
        {this.renderUpLoadLogoField("fileUploadBigLogo", data.attachments,
          t("pms.attachment.note_big"), t("pms.attachment.big_logo"))}
        {this.renderUpLoadLogoField("fileUploadSmallLogo", data.small_attachments,
          t("pms.attachment.note_small"), t("pms.attachment.small_logo"))}
        {this.renderRssSource()}
      </div>
    )
  }
}
