import ListHeader from "../Master/BaseMaster/ListHeader";
import ActionSearch from "material-ui/svg-icons/action/search";
import Uploader from "./Uploader";
import RaisedButton from "material-ui/RaisedButton";
import Folder from "material-ui/svg-icons/file/folder";
import FolderDetail from "./FolderDetail";
import FolderForm from "./FileFolderForm";

export default class ManualFile extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentFolder: null,
      textSearch: "",
      childFolders: [],
      manualFiles: [],
    }
    this.searchQuery = "";
  }

  componentDidMount() {
    this.setToolBar(t("manual_files.title"));
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
    API.Folder.get(this.handleGetFolderCallback, this.props.params.id, this.getOptions());
  }

  getOptions() {
    let include = {
      parent: {},
      manual_files: {include: {creator: {}}},
      folders: {include: {creator: {}}},
    };

    return {
      methods: ["recursive_parent"],
      include: JSON.stringify(include),
    };
  }

  getSearchFolderOptions() {
    let include = {creator: {}};

    return {
      search_query: {query: this.searchQuery, parent_id: this.state.currentFolder.id},
      include: JSON.stringify(include),
      methods: ["path_name"],
    }
  }

  getSearchManualFileOptions() {
    let include = {creator: {}};

    return {
      search_query: {query: this.searchQuery, folder_id: this.state.currentFolder.id},
      include: JSON.stringify(include),
      methods: ["path_name"],
    }
  }

  handleGetFolderCallback = (status, data) => {
    if (!status) return;

    this.setState({
      currentFolder: data.folder,
    });
  }

  handleUpdateFileList = (manualFile) => {
    let currentFolder = update(this.state.currentFolder, {
      manual_files: {$push: [manualFile]}
    });

    this.setState({
      currentFolder: currentFolder
    });
  }

  handleOpenFolderForm = (folder, type) => {
    this.refs.folderForm.open(folder, type);
  }

  handleSaveCallback = (folderId) => {
    API.Folder.get(this.handleGetFolderCallback, folderId, this.getOptions());
  }

  handleChangeTextSearch = (text) => {
    this.setState({
      textSearch: text,
    });
  }

  handleKeyDownSearch = (event) => {
    if (event.keyCode === 13) {
      this.handleSearch();
    }
  }

  handleSearch = () => {
    this.searchQuery = this.state.textSearch;
    if (this.searchQuery) {
      API.Folder.getList(this.handleGetListFolderCallback, this.getSearchFolderOptions());
      API.ManualFile.getList(this.handleGetListManualFileCallback, this.getSearchManualFileOptions());
    } else {
      this.getFolder();
    }
  }

  handleClickFolder = () =>{
    this.setState({
      textSearch: "",
    });
    this.searchQuery = "";
  }

  handleGetListFolderCallback = (status, data) => {
    if (!status) return;

    this.setState({
      childFolders: data.folders,
    });
  }

  handleGetListManualFileCallback = (status, data) => {
    if (!status) return;

    this.setState({
      manualFiles: data.manual_files,
    });
  }

  renderActionHeader() {
    return (
      <div>
        <mui.TextField className="input-search"
          value={this.state.textSearch}
          hintText={t("common.search")}
          onKeyDown={this.handleKeyDownSearch}
          onChange={(event) => this.handleChangeTextSearch(event.target.value)}
        />
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
          onClick={() => {
            this.setState({
              textSearch: "",
            });
            this.searchQuery = "";
            Helper.transitionTo(`/manual_files/${folder.id}`);
          }}
        >
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
    let authorized_pages = App.auth.authorized_pages;

    let icon = <span className="group-button">
      {authorized_pages.manual_files.upload ?
        <Uploader
          onChange={this.handleUpdateFileList}
          folderId={this.state.currentFolder.id} />
        : null}
      {authorized_pages.manual_files.new_folder ?
        <RaisedButton
          onClick={() => this.handleOpenFolderForm({}, "folder")}
          primary={true}
          labelPosition="after"
          icon={<Folder color="white" />}
          label={t("manual_files.button.create_folder")}/>
        : null}
    </span>;

    return (
      <div className="base-master-index manual-file-index">
        <ListHeader
          icon={icon}>
          {this.renderActionHeader()}
        </ListHeader>
        {this.renderBreadcrumb()}
        <FolderDetail onClickEdit={this.handleOpenFolderForm}
          parentFolder={this.state.currentFolder}
          searchResult={{
            text: this.searchQuery,
            folders: this.state.childFolders,
            manualFiles: this.state.manualFiles,
          }}
          onClickFolder={this.handleClickFolder}
        />
        <FolderForm
          parentFolderId={this.state.currentFolder.id}
          onSaveCallback={this.handleSaveCallback}
          ref="folderForm" />
      </div>
    )
  }
}
