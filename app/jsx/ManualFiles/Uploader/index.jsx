import FileCloudUpload from "material-ui/svg-icons/file/cloud-upload";
import RaisedButton from "material-ui/RaisedButton";

export default class Uploader extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      processing: false
    }
  }

  handleUploadFiles = (event) => {
    let file = event.target.files[0];
    if (!file) return;

    let attachment = new FormData();
    attachment.append("attachment", file);
    attachment.append("folder_id", this.props.folderId);

    this.setState({
      processing: true,
    });

    API.ManualFile.create(this.handleSaveCallback, attachment);
  }

  handleSaveCallback = (status, data) => {
    if (status) {
      this.props.onChange(data.manual_file);

      this.setState({
        processing: false,
      });
    } else {
      this.setState({processing: false});

      if (data["attachment_file_size"] || data["attachment_content_type"] ||
        data["attachment_file_name"]) {
        for (let key in data) {
          Helper.showMessage(t(`attachment.${key}`) + " " + data[key][0], "error");
        }
      } else {
        Helper.showMessage(t("attachment.invalid"), "error");
      }
    }
    this.refs.fileInput.value = "";
  }

  render() {
    return (
      <div className="row file-uploader">
        <div className="upload-component">
          <RaisedButton
            primary={true}
            labelPosition="after"
            icon={<FileCloudUpload color="white" />}
            label={this.state.processing ? t("attachment.btn_uploading") : t("attachment.btn_choose_file")}
            className="upload-button"
            title={t("manual_files.button.no_chose_file")}
          >
            <input
              onChange={this.handleUploadFiles}
              type="file"
              className="file-input"
              ref="fileInput"
            />
          </RaisedButton>
        </div>
      </div>
    );
  }
}
