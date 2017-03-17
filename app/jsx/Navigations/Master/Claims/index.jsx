import ListHeader from "../../../Master/BaseMaster/ListHeader";
import ClaimList from "./ClaimList";

export default class Index extends PageComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setToolBar(t("navigations.header_title"));
  }

  render() {
    let icon = <i className="material-icons icon-header">sentiment_very_dissatisfied</i>;

    return (
      <div className="base-master-index">
        <div className="master-header">
          <div className="left-header">
            <ListHeader
              className="header_title"
              icon={icon}
              title={t("navigations.master.claims")}>
            </ListHeader>
          </div>
        </div>
        <ClaimList showButtonEditAndDelete={true} />
      </div>
    )
  }
}

