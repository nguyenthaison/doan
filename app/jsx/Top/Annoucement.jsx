import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import AnnouncementForm from "./AnnouncementForm";

export default class Announcement extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      announcement: App.auth.settings.find(item => item.key === "announcement")
    }
  }

  handleClickEdit = () => {
    this.refs.announcementForm.open(this.state.announcement);
  }

  handleAnnouncementUpdate = (announcement) => {
    this.setState({
      announcement: announcement,
    })
  }

  render() {
    let announcement = this.state.announcement;
    let content = announcement ? announcement.content : "";
    let role = App.auth.role;

    if (role === "member" && !content) return (<div></div>);
    return (
      <div className="row text-animation" style={{border: `2px solid ${theme.secondaryColor}`}}>
        <div className="wapper-text-content">
          <span>
            <img src="/images/speaker.png" className="announcement-img"></img>
          </span>
          <marquee className="text-content" style={{color: theme.secondaryColor}}>{content}</marquee>
        </div>
        {role === "member" ? "" :
          <div className="edit-text-animation">
            <EditorModeEdit onClick={this.handleClickEdit}
              className="btn-edit pointer"
              style={{width: 18}} />
          </div>
        }
        <AnnouncementForm ref="announcementForm" onUpdate={this.handleAnnouncementUpdate} />
      </div>
    )
  }
}
