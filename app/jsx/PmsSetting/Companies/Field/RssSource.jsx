export default class RssSource extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleChangeTextField = (fieldName, value) => {
    this.props.onChange(fieldName, value);
  }

  handleRemoveRssResource = () => {
    this.props.onRemoveRss();
  }

  handleClickDetele = () => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.delete"),
      this.handleRemoveRssResource);
  }

  render() {
    let errors = this.props.errors;
    let title = this.props.rssSource.title;
    let url = this.props.rssSource.url;

    return(
      <div className="rss-sources">
        <div className="row relative">
          <div className="col-xs-6">
            <cm.TextField
              fieldName="title"
              hintText="title"
              errorText={errors ? errors["rss_sources.title"] : null}
              value={title || ""}
              onChange={(event, value) => this.handleChangeTextField("title", value)}
              fullWidth={true}
            />
          </div>
          <div className="col-xs-6">
            <cm.TextField
              fieldName="url"
              hintText="url"
              errorText={errors ? errors["rss_sources.url"] : null}
              value={url || ""}
              onChange={(event, value) => this.handleChangeTextField("url", value)}
              fullWidth={true}
            />
          </div>
          <i
            className="material-icons remove-search-icon pointer"
            onClick={title || url ? this.handleClickDetele : this.handleRemoveRssResource}>cancel
          </i>
        </div>
      </div>
    )
  }
}
