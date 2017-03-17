export default class Feeds extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      rssSources: [],
    }
  }

  componentDidMount() {
    let include = {
      feeds: {only: ["id", "url", "title", "description"]},
    }

    API.RssSource.getList(this.handleGetRssSourcesCallback, {
      filter: {field_id: App.auth.field_id},
      include: JSON.stringify(include),
    });
  }

  handleGetRssSourcesCallback = (status, data) => {
    if (!status) return;
    this.setState({
      rssSources: data.rss_sources,
    })
  }

  renderFeedContent(feeds) {
    if (!feeds) return;
    return feeds.map((feed, index) => {
      if (index >= 5) return;
      return(
        <div title={feed.description} key={feed.id} className="feed-item">
          <a href={feed.url} target="_blank">{feed.title}</a>
        </div>
      )
    })
  }

  renderFeed() {
    let rssSources = this.state.rssSources.reverse();
    if (!rssSources) return;
    return rssSources.map((rssSource, index) => {
      return(
        <div key={rssSource.id}>
          <div className="row rss-feed">
            <div className="rss-feed-title ellipsis-text" title={rssSource.title}>
              <h5 style={{color: theme.secondaryColor}}>
                {rssSource.title}
              </h5>
            </div>
            <div className="rss-feed-content">
              {this.renderFeedContent(rssSource.feeds)}
            </div>
          </div>
        </div>
      )
    });
  }

  render() {
    return (
      <div className="feed">
        <div className="rss-feed-header" style={{background: theme.secondaryColor}}>
          <h4>
            <i className="material-icons">rss_feed</i>
            <span>{t("top.feed.title")}</span>
          </h4>
        </div>
        {this.renderFeed()}
      </div>
    )
  }
}
