import FaqList from "./FaqList";
import ListDialog from "./ListDialog";
import Contribution from "./Contribution";
import Helps from "./Helps";

const takeRecord = 5;

export default class MyPage extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      faquestions: [],
      user_activities: [],
      openListFaquestion: false,
      openListCommunity: false,
    };
  }

  componentDidMount() {
    this.setToolBar(t("my_page.title"));
    API.Faquestion.getList((status, data) => this.handleGetListCallback("faquestions", status, data),
      {filter: {creator_id: App.auth.id}, take: takeRecord});
    API.UserActivity.getList((status, data) => this.handleGetListCallback("user_activities", status, data),
      this.getComOptions());
  }

  getComOptions() {
    let include = {
      community: {
        include: {
          faquestion: {
            only: ["id"],
          }
        }
      },
      comment: {
        include: {
          commentable: {
            only: ["id", "title"],
          },
        }
      }
    };

    return {
      include: JSON.stringify(include),
      take: takeRecord,
      filter: {user_id: App.auth.id}
    };
  }

  handleGetListCallback = (stateKey, status, data) => {
    if (!status) return;

    this.setState({
      [stateKey]: data[stateKey],
    });
  }

  renderTitleFaq(icon, type) {
    return (
      <div className="title-list-faq-com">
        <i className="material-icons">{icon}</i>
        <span>{t(`my_page.${type.toLowerCase()}_history`)}</span>
        <div className="pull-right go-to-history">
          <i className="material-icons">play_circle_outline</i>
          <span
            onClick={() => this.refs[type.toLowerCase()].open()}
            className="go-to-history-list pointer">
            {t("my_page.go_to_history_list")}
          </span>
        </div>
      </div>
    );
  }

  renderHelpIndex() {
    return (
      <Helps />
    );
  }

  renderFaqList() {
    let faquestions = this.state.faquestions;

    return (
      <div className="faq-list">
        {this.renderTitleFaq("mode_comment", "Faquestion")}
        <FaqList
          list={faquestions}
          type="faq"
          basePath="/faqs/"
        />
      </div>
    );
  }

  renderComList() {
    let userActivities = this.state.user_activities;

    return (
      <div className="com-list">
        {this.renderTitleFaq("forum", "Community")}
        <FaqList
          list={userActivities}
          type="community"
          basePath="/communities/"
        />
      </div>
    );
  }

  renderDialogs() {
    return (
      <div>
        <ListDialog
          ref="faquestion"
          title={t("my_page.faquestion_history")}
          icon="mode_comment"
          type="Faquestion"
          basePath="/faqs/"
          list={this.state.faquestions}
        />

        <ListDialog
          ref="community"
          title={t("my_page.community_history")}
          icon="forum"
          type="Community"
          basePath="/communities/"
          list={this.state.user_activities}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="my-page top-page col-md-12">
        <div className="faq-com-list pull-left mypage-list">
          {this.renderHelpIndex()}
          {App.auth.role !== "member" ? this.renderFaqList() : null}
          {this.renderComList()}
          {this.renderDialogs()}
        </div>
        <div className="attributes-session pull-right">
          <Contribution />
        </div>
      </div>
    )
  }
}
