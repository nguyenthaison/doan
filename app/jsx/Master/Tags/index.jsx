import TagDetail from "./TagDetail";
import TagForm from "./TagForm";
import EditorFormatListBulleted from "material-ui/svg-icons/editor/format-list-bulleted";
import SmallTags from "./SmallTags";

export default class Tags extends BaseMaster.List{
  constructor(props) {
    super(props);
    this.apiName = "Tag";
    this.tableName = "tags";
    this.transPath = "master.big_tags";
    this.iconHeader = "local_offer";
    this.fields = [
      {name: "name", width: 6},
    ];
    this.objectDetail = TagDetail;
    this.objectForm = TagForm;
    this.sortable = true;
    this.child = {
      dialog: SmallTags,
    }
  }

  getOptions() {
    return {
      filter: {
        parent_id: 0,
      },
      order_by: "order_number desc",
    }
  }

  handleShowChildren = (tag) => {
    this.refs.smallTags.open(tag);
  }

  renderAdditionDialogs() {
    return <SmallTags ref="smallTags" />;
  }

  renderAdditionRowButton(tag) {
    return (
      <cm.RaisedButton
        className="addition-btn"
        label={t("master.small_tags.attributes.name")}
        secondary={true}
        icon={<EditorFormatListBulleted />}
        buttonStyle={{backgroundColor: theme.primary1Color}}
        onTouchTap={(event) => this.handleShowChildren(tag)} />
    );
  }
}
