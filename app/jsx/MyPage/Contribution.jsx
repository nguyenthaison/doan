const icons = {
  community_created: "mode_comment",
  comment_created: "forum",
  like: "thumb_up",
  favorite: "favorite"
}

export default class Contribution extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    API.Authentication.getContribution(this.handleGetListCallback);
  }

  handleGetListCallback = (status, data) => {
    if (!status) return;

    this.setState({
      contribution: data.contribution,
    });
  }

  renderContributionContent(data) {
    return (
      <div className="contribution-content">
        <div className="in-month">{`${t("my_page.contribution.in_month")}: ${data.in_month}`}</div>
        <div className="total">{`${t("my_page.contribution.total")}: ${data.total}`}</div>
      </div>
    );
  }

  renderContribution(type, data) {
    let content = "";
    if (typeof data[Object.keys(data)[0]] === "object") {
      content = Object.keys(data).map(subTitle => {
        return (
          <div key={subTitle}>
            <div className="sub-title">{t(`my_page.contribution.${type}.${subTitle}`)}</div>
            {this.renderContributionContent(data[subTitle])}
          </div>
        );
      })
    } else {
      content = this.renderContributionContent(data);
    }

    return (
      <div className="contribution">
        <div className="contribution-title">
          <i className="material-icons">{icons[type]}</i>
          <span>{t(`my_page.contribution.${type}.title`, {fallback:
            t(`my_page.contribution.${type}`)})}</span>
        </div>
        {content}
      </div>
    );
  }

  render() {
    let contribution = this.state.contribution;
    if (!contribution) return null;

    return (
      <div className="history-contributions">
        <div className="title">
          {t("my_page.contribution.title")}
        </div>
        <div>
          {Object.keys(contribution).map(type => {
            return (
              <div key={type}>
                {this.renderContribution(type, contribution[type])}
              </div>
          )})}
        </div>
      </div>
    );
  }
}
