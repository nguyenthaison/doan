import Image from "./Image";
import EditorModeEdit from "material-ui/svg-icons/editor/mode-edit";
import ActionDelete from "material-ui/svg-icons/action/delete";

export default class BookmarkFolderDetail extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleClickDetele = (item) => {
    Helper.showConfirm(
      t("common.message.confirmation.title"),
      t("common.message.confirmation.delete"),
      () => this.handleConfirmDelete(item));
  }

  handleConfirmDelete = (item) => {
    if (item.bookmark_folder_id) {
      API.Bookmark.delete(this.handleDeleteCallback, item.id);
    } else {
      API.BookmarkFolder.delete(this.handleDeleteCallback, item.id);
    }
  }

  handleDeleteCallback = (status, data) => {
    if (status) {
      this.props.onSaveCallback(this.props.folder.id);
      Helper.showMessage(t("common.message.deleted_success"));
    }
  }

  renderFolderList() {
    let authorized_pages = App.auth.authorized_pages;

    return this.props.folder.bookmark_folders.map((folder) => {
      return (
        <div
          onClick={() => Helper.transitionTo(`/bookmarks/${folder.id}`)}
          className="pointer row table-row table-row-striped-2"
          key={folder.id}>
            <div className="col-xs-4 td ellipsis-text icon-name-field">
              <span className="file-icon">
                <i className="material-icons">folder</i>
              </span>
              <span className="folder-name">{folder.name}</span>
            </div>
            <div className="col-xs-4 td ellipsis-text"></div>
            <div className="col-xs-4 td btn-group">
              {authorized_pages.bookmarks.delete ?
                <cm.RaisedButton
                  className="btn-delete"
                  label={t("common.delete")}
                  secondary={true}
                  icon={<ActionDelete />}
                  onClick={() => this.handleClickDetele(folder)}
                  style={{minWidth: "110px"}}
                />
                : null}
              {authorized_pages.bookmarks.edit ?
                <cm.RaisedButton
                  className="btn-edit btn-mr5"
                  label={t("common.edit")}
                  primary={true}
                  icon={<EditorModeEdit />}
                  onClick={() => this.props.onClickEdit(folder, "folder")} />
                : null}
            </div>
        </div>
      );
    });
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

  renderBookmarkList() {
    let authorized_pages = App.auth.authorized_pages;
    let bookmarks = this.props.folder.bookmarks;
    bookmarks = this.handleReOrderlist(bookmarks, "name");
    return bookmarks.map((bookmark) => {
      let matches = bookmark.url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
      let domain = matches && matches[1];

      return (
        <div
          className="row table-row table-row-striped-2"
          key={bookmark.id}>
            <div className="col-xs-4 td ellipsis-text icon-name-field">
              <span className="file-icon">
                <Image src={`https://www.google.com/s2/favicons?domain=${domain}`}
                  defaultSrc="/images/non-favicon.png" />
              </span>
              <span className="folder-name">
                <a href={bookmark.url} target="_blank">{bookmark.name}</a>
              </span>
            </div>
            <div className="col-xs-4 td ellipsis-text">
              {bookmark.description}
            </div>
            <div className="col-xs-4 td btn-group">
              {authorized_pages.bookmarks.delete ?
                <cm.RaisedButton
                  className="btn-delete"
                  label={t("common.delete")}
                  secondary={true}
                  icon={<ActionDelete />}
                  onClick={() => this.handleClickDetele(bookmark)}
                  style={{minWidth: "110px"}}
                />
                : null}
              {authorized_pages.bookmarks.edit ?
                <cm.RaisedButton
                  className="btn-edit btn-mr5"
                  label={t("common.edit")}
                  primary={true}
                  icon={<EditorModeEdit />}
                  onClick={() => this.props.onClickEdit(bookmark, "bookmark")} />
                : null}
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
              <span style={{color: theme.secondaryColor}}>{t("bookmarks.attributes.name")}</span></div>
            <div className="col-xs-4 header-title td">
              <span style={{color: theme.secondaryColor}}>{t("bookmarks.attributes.description")}</span></div>
            <div className="col-xs-4 header-title td"></div>
          </div>
          <div className="table-index">
            {this.renderFolderList()}
            {this.renderBookmarkList()}
          </div>
        </div>
      </div>
    );
  }
}
