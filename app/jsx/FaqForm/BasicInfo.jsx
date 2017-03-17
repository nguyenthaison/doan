import ImageIcon from 'material-ui/svg-icons/image/image';

export default class BasicInfo extends BaseComponent {
  constructor(props) {
    super(props);

    let basicInfo = this.filterObjectKeys(
      ["title", "question", "answer", "priority"],
      this.props.faq);

    this.state = {
      basicInfo: basicInfo || {},
    }
  }

  getBasicInfo() {
    let basicInfo = this.state.basicInfo;

    if (!this.props.withoutAnswer) {
      let answerAttachmentIds = this.refs.fileUploadAnswer.getAttachmentIds();
      answerAttachmentIds = answerAttachmentIds.length > 0 ? answerAttachmentIds : [""];
      basicInfo["answer_attachment_ids"] = answerAttachmentIds;
    }

    let questionAttachementIds = this.refs.fileUploadQuestion.getAttachmentIds();
    questionAttachementIds = questionAttachementIds.length > 0 ? questionAttachementIds : [""];
    basicInfo["attachment_ids"] = questionAttachementIds;

    return basicInfo;
  }

  handleChangeInputField = (fieldName, value) => {
    let newState = update(this.state.basicInfo, {[fieldName]: {$set: value}});

    this.setState({basicInfo: newState});
  }

  renderPriority = () => {
    let priorities = ["low", "medium", "high"];

    return priorities.map((priority, index) => {
      return(
        <mui.RadioButton
          className="priority-item"
          key={index}
          value={priority}
          label={t(`faquestions.priorities.${priority}`)}
        />
      );
    });
  }

  renderLabel = (fieldName, required = false) => {
    let requiredText = required ? <div className="required">{t("common.required")}</div> : "";
    return(
      <div className="form-section-title">
        {t(`faquestions.attributes.${fieldName}`)}
        {requiredText}
      </div>
    );
  }

  renderTextInput = (fieldName, options) => {
    return(
      <div className="form-group">
        <cm.TextField
          fieldName={t(`faquestions.attributes.${fieldName}`)}
          value={this.state.basicInfo[fieldName] || ""}
          onChange={(event, value) => this.handleChangeInputField(fieldName, value)}
          hintText={t(`faquestions.form.placeholder.${fieldName}`)}
          {...options}
        />
      </div>
    );
  }

  render() {
    let answerField = this.props.withoutAnswer ? "" : (
        <div className="row">
          <div className="col-md-10 form-group">
            {this.renderTextInput("answer",
              {fullWidth: true, multiLine: true, rowsMax: 10, maxLength: 2000, required: true, counting: true}
            )}
          </div>
          <div className="row">
            <div className="col-md-10 form-group">
              <div className="row">
                <ImageIcon className="form-section-icon" style={{color: theme.secondaryColor}}/>
                {this.renderLabel("file")}
              </div>
              <cm.FileUploader ref="fileUploadAnswer" defaultFiles={this.props.faq.answer_attachments}/>
            </div>
          </div>
        </div>
      );

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            {this.renderTextInput("title", {fullWidth: true, maxLength: 100, required: true, counting: true})}
          </div>
          <div className="col-md-4">
            <div>
              {this.props.type == "faq" ? this.renderLabel("priority", true) : this.renderLabel("severity", true)}
            </div>
            <div className="list-priority-faq">
              <mui.RadioButtonGroup
                className="priority-container"
                name="priority"
                defaultSelected={this.state.basicInfo.priority}
                onChange={(event, value) => this.handleChangeInputField("priority", value)}
              >
                {this.renderPriority()}
              </mui.RadioButtonGroup>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 form-group">
            {this.renderTextInput("question",
              {fullWidth: true, multiLine: true, rowsMax: 10, maxLength: 2000, required: true, counting: true}
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 form-group">
            <div className="row">
              <ImageIcon className="form-section-icon" style={{color: theme.secondaryColor}}/>
              {this.renderLabel("file")}
            </div>
            <cm.FileUploader ref="fileUploadQuestion" defaultFiles={this.props.faq.attachments} />
          </div>
        </div>
        {answerField}
      </div>
    )
  }
}
