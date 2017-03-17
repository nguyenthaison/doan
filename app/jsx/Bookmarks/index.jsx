import ListHeader from "../Master/BaseMaster/ListHeader";
import ActionSearch from "material-ui/svg-icons/action/search";
import RaisedButton from "material-ui/RaisedButton";
import FolderIcon from "material-ui/svg-icons/file/folder";
import AddCircle from "material-ui/svg-icons/content/add-circle";
import BookmarkFolderDetail from "./BookmarkFolderDetail";
import BookmarkFolderForm from "./BookmarkFolderForm";

export default class Bookmark extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentFolder: null,
    }
  }

  componentDidMount() {
    this.setToolBar(t("bookmarks.title"));
    this.getFolder();
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.params.id;
    let newId = this.props.params.id;
    if (newId !== oldId) {
      this.getFolder();
    }
  }

  getFolder() {
    API.BookmarkFolder.get(this.handleGetBookmarkFolderCallback, this.props.params.id, this.getOptions());
  }

  getOptions() {
    let include = {
      parent: {},
      bookmarks: {include: {creator: {}}},
      bookmark_folders: {include: {creator: {}}},
    };

    return {
      methods: ["recursive_parent"],
      include: JSON.stringify(include),
    };
  }

  handleGetBookmarkFolderCallback = (status, data) => {
    if (!status) return;

    this.setState({
      currentFolder: data.bookmark_folder,
    });
  }

  handleOpenFolderForm = (folder, type) => {
    this.refs.bookmarkFolderForm.open(folder, type);
  }

  handleSaveCallback = (folderId) => {
    API.BookmarkFolder.get(this.handleGetBookmarkFolderCallback, folderId, this.getOptions());
  }

  renderActionHeader() {
    return (
      <div>
        <mui.TextField className="input-search"
          hintText={t("common.search")}
          onKeyDown={this.handleKeyDownSearch} />
          <mui.IconButton className="icon-search" onClick={this.handleSearch}>
            <ActionSearch />
          </mui.IconButton>
      </div>
    );
  }

  renderBreadcrumb() {
    let breadcrumb = this.state.currentFolder.recursive_parent.map((folder) => {
      return (
        <span key={folder.id}
          className="pointer"
          onClick={() => Helper.transitionTo(`/bookmarks/${folder.id}`)}>
          {folder.name} >
        </span>
      );
    });

    return (
      <div className="breadcrumb-folder">
        {breadcrumb}
        <span>{this.state.currentFolder.name}</span>
      </div>
    );
  }

  render() {
    if (!this.state.currentFolder) return null;

    let icon = <span className="group-button">
      {App.auth.authorized_pages.bookmarks.new ?
        <div>
          <RaisedButton
            onClick={() => this.handleOpenFolderForm({}, "bookmark")}
            className="new-bookmark"
            primary={true}
            labelPosition="after"
            icon={<AddCircle color="white" />}
            label={t("bookmarks.button.create_bookmark")}/>
          <RaisedButton
            onClick={() => this.handleOpenFolderForm({}, "folder")}
            className="new-folder"
            primary={true}
            labelPosition="after"
            icon={<FolderIcon color="white" />}
            label={t("bookmarks.button.create_folder")}
          />
        </div>
        : null}
    </span>;

    return (
      <div className="base-master-index manual-file-index">
        <ListHeader icon={icon}>
          {this.renderActionHeader()}
        </ListHeader>
        {this.renderBreadcrumb()}
        <BookmarkFolderDetail
          onClickEdit={this.handleOpenFolderForm}
          folder={this.state.currentFolder}
          onSaveCallback={this.handleSaveCallback}
        />
        <BookmarkFolderForm
          parentFolderId={this.state.currentFolder.id}
          onSaveCallback={this.handleSaveCallback}
          ref="bookmarkFolderForm"
        />
      </div>
    )
  }
}
