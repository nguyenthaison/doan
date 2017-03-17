import EditorModeEdit from "material-ui/svg-icons/editor/mode-edit";
import FileDownload from "material-ui/svg-icons/file/file-download";
import ContentCopy from "material-ui/svg-icons/content/content-copy";
import CopyToClipboard from "react-copy-to-clipboard";

const PDF_MIME_TYPES = ["application/pdf"];

const POWPOINT_MIME_TYPES = [
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-powerpoint"
];

const EXCEL_MIME_TYPES = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
];

const WORD_MIME_TYPES = [
  "application/msword"
];

const VIDEO_MIME_TYPES = [
  "video/mp4"
];

const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif"
];

const TEXT_MINE_TYPE = ["text/plain"];
const CSV_MINE_TYPE = ["text/csv"];
const DOCX_MINE_TYPE = ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export default class FolderDetail extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      searching: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    let searchResult = nextProps.searchResult;
    let searching = false;

    if (searchResult.text && searchResult.text !== "") {
      searching = true;
    }

    this.setState({
      searching: searching,
    });
  }

  handleDownloadFile = (file) => {
    App.auth.environment  === "production" ?
      API.ManualFile.downLoad(this.handleCallbackDownloadFile, file) :
      window.open(`/api/v1/download/${file.id}`,'_blank');
  }

  handleCallbackDownloadFile = (status, data) => {
    if (status) {
      window.open(data.url, "_self");
    } else {
      Helper.showMessage(t("common.message.connection_error"), "error");
    }
  }

  renderIconFile(fileType) {
    let iconPath = "/images/file-icon.png";

    switch (true) {
      case PDF_MIME_TYPES.includes(fileType):
        iconPath = "/images/pdf-icon.png";
        break;
      case POWPOINT_MIME_TYPES.includes(fileType):
        iconPath = "/images/powepoint-icon.png";
        break;
      case EXCEL_MIME_TYPES.includes(fileType):
        iconPath = "/images/exel-icon.png";
        break;
      case WORD_MIME_TYPES.includes(fileType):
        iconPath = "/images/word-icon.png";
        break;
      case VIDEO_MIME_TYPES.includes(fileType):
        iconPath = "/images/movie-icon.png";
        break;
      case IMAGE_MIME_TYPES.includes(fileType):
        iconPath = "/images/photo-icon.png";
        break;
      case TEXT_MINE_TYPE.includes(fileType):
        iconPath = "/images/txt-icon.png";
        break;
      case CSV_MINE_TYPE.includes(fileType):
        iconPath = "/images/csv-icon.png";
        break;
      case DOCX_MINE_TYPE.includes(fileType):
        iconPath = "/images/docx-icon.png";
        break;
    }

    return (
      <img src={iconPath} />
    );
  }

  handleGetBaseLinkFolder = (folder) => {
    let baseLink = "";
    folder.recursive_parent.map((folder) => {
      baseLink += `${folder.name}/`;
    });
    baseLink += `${folder.name}/`;
    return baseLink;
  }

  handleReOrderlist = (list, order) => {
    list = list.sort((firstItem, secondItem) => {
      firstItem = firstItem[order].toUpperCase();
      secondItem = secondItem[order].toUpperCase();
      if (firstItem < secondItem) {
        return -1;
      }
      if (firstItem > secondItem) {
        return 1;
      }
      return 0;
    });
    return list;
  }

  getNameSearchContent(text) {
    let reg = new RegExp(this.props.searchResult.text, "ig");
    if (this.props.searchResult.text) {
      return text.replace(reg, (match) => {
        return `<span class="match-search-string">${match}</span>`;
      });
    }
    return text;
  }

  handleCopy = () => {
    Helper.showMessage(t("manual_files.button.copied"), "success");
  }

  renderFolderList() {
    let parentFolder = this.props.parentFolder;
    let folders = this.state.searching ? this.props.searchResult.folders :
      this.props.parentFolder.folders;
    folders = this.handleReOrderlist(folders, "name");

    let baseLink = this.handleGetBaseLinkFolder(this.props.parentFolder);

    return folders.map((folder) => {
      let currentLocation = `manual_files/${folder.id}`
      let link = baseLink + `${folder.name}` + `(${currentLocation})`;
      let folderName = this.getNameSearchContent(folder.name);
      return (
        <div
          onClick={() => {
            this.props.onClickFolder();
            Helper.transitionTo(`/manual_files/${folder.id}`);
          }}
          className={`pointer row table-row table-row-striped-2 ${this.state.searching ?
            "search-table-row" : null}`}
          key={folder.id}>
            <div className="col-xs-4 td ellipsis-text icon-name-field">
              <span className="file-icon">
                <i className="material-icons">folder</i>
              </span>
              <span className="folder-name" dangerouslySetInnerHTML={{__html: folderName}}></span>
              {this.state.searching ? <div className="path-name">{folder.path_name}</div> : null}
            </div>
            <div className="col-xs-2 td ellipsis-text">{folder.creator.name}</div>
            <div className="col-xs-2 td ellipsis-text">{folder.created_at}</div>
            <div className="col-xs-4 td btn-group">
              {App.auth.authorized_pages.manual_files.edit ?
                <cm.RaisedButton
                  className="btn-edit btn-mr5"
                  label={t("common.edit")}
                  primary={true}
                  icon={<EditorModeEdit />}
                  onClick={() => this.props.onClickEdit(folder, "folder")} />
                : null}
              <CopyToClipboard text={link} onCopy={this.handleCopy}>
                <cm.RaisedButton
                  className="btn-edit btn-mr5"
                  label={t("manual_files.button.copy")}
                  primary={true}
                  icon={<ContentCopy />} />
              </CopyToClipboard>
              <cm.RaisedButton
                labelPosition="after"
                icon={<FileDownload color="white" />}
                style={{visibility: "hidden"}}
                label={t("manual_files.button.download")}/>
            </div>
        </div>
      );
    });
  }

  renderFileList() {
    let manualFiles = this.state.searching ? this.props.searchResult.manualFiles :
      this.props.parentFolder.manual_files;
    manualFiles = this.handleReOrderlist(manualFiles, "file_name");

    return manualFiles.map((file) => {
      let fileName = this.getNameSearchContent(file.file_name);

      return (
        <div className={`row table-row table-row-striped-2 ${this.state.searching ?
            "search-table-row" : null}`} key={file.id}>
          <div className="col-xs-4 td ellipsis-text">
            <span className="file-icon">{this.renderIconFile(file.attachment_content_type)}</span>
            <span className="file-name" dangerouslySetInnerHTML={{__html: fileName}}></span>
            {this.state.searching ? <div className="path-name">{file.path_name}</div> : null}
          </div>
          <div className="col-xs-2 td ellipsis-text">{file.creator.name}</div>
          <div className="col-xs-2 td ellipsis-text">{file.created_at}</div>
          <div className="col-xs-4 td btn-group">
            {App.auth.authorized_pages.manual_files.edit ?
              <cm.RaisedButton
                className="btn-edit btn-mr5"
                label={t("common.edit")}
                primary={true}
                icon={<EditorModeEdit />}
                onClick={() => this.props.onClickEdit(file, "file")} />
              : null}
            <CopyToClipboard text={file.link_file} onCopy={this.handleCopy}>
              <cm.RaisedButton
                className="btn-edit btn-mr5"
                label={t("manual_files.button.copy")}
                primary={true}
                icon={<ContentCopy />} />
            </CopyToClipboard>
            <cm.RaisedButton
              onClick={() => this.handleDownloadFile(file)}
              primary={true}
              labelPosition="after"
              icon={<FileDownload color="white" />}
              label={t("manual_files.button.download")}/>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="body-index">
        <div>
          <div className="row table-header table-row">
            <div className="col-xs-4 header-title td">
              <span style={{color: theme.secondaryColor}}>{t("manual_files.file_name")}</span></div>
            <div className="col-xs-2 header-title td">
              <span style={{color: theme.secondaryColor}}>{t("common.attributes.creator_id")}</span></div>
            <div className="col-xs-2 header-title td">
              <span style={{color: theme.secondaryColor}}>{t("common.attributes.created_at")}</span></div>
            <div className="col-xs-4 header-title td"></div>
          </div>
          <div className="table-index">
            {this.renderFolderList()}
            {this.renderFileList()}
          </div>
        </div>
      </div>
    );
  }
}
