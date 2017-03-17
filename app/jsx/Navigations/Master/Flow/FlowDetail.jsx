import NavigationContent from "../../NavigationContent";

export default class FlowDetail extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      flow: this.props.flow ? this.props.flow : null,
    }
  }

  componentDidMount() {
    if (!this.props.flow) {
      API.Flow.get(this.handleGetFlowCallback, this.props.params.id, this.getOptions());
    }
  }

  getOptions() {
    let include = {
      creator: {only: ["name"]},
      client_flow_lines: {
        include: {
          client: {only: ["id", "short_name"]},
          line: {only: ["id", "name"]},
        }
      },
      flow_tags: {
        include: {
          tag: {only: ["id", "name"]},
          parent_tag: {only: ["id", "name"]},
        }
      },
      big_trouble: {only: ["id", "name"]},
      medium_trouble: {only: ["id", "name"]},
      small_trouble: {only: ["id", "name"]},
      tiny_trouble: {only: ["id", "name"]},
      todos: {include: {nodes: {}, parent_todo: {}, attachments: {}}},
    };

    return {
      include: JSON.stringify(include),
    }
  }

  handleGetFlowCallback = (status, data) => {
    if (status) {
      this.setState({
        flow: data.flow,
      });
    } else {
      Helper.showErrors(data);
    }
  }

  handleImport = () => {
    this.props.onImport();
  }

  handleClose = () => {
    this.props.onClose();
  }

  renderClientLineList() {
    let clientLines = this.state.flow.client_flow_lines;

    return clientLines.map((clientLine, index) => {
      return(
        <span key={index}>
          {clientLine.client.name}
          {clientLine.line ? " > " + clientLine.line.name : ""}
          {index != (clientLines.length - 1) ? " , " : ""}
        </span>
      );
    });
  }

  renderTagList() {
    let flowTags = this.state.flow.flow_tags;

    return flowTags.map((flowTag, index) => {
      let childTagFormat = flowTag.tag ? " > " + flowTag.tag.name : "";

      return(
        <span key={index}>
          {flowTag.parent_tag.name}
          {childTagFormat}
          {index != (flowTags.length - 1) ? " , " : ""}
        </span>
      );
    })
  }

  renderTroubleList() {
    let flow = this.state.flow;
    let troubles = [
      flow.big_trouble,
      flow.medium_trouble,
      flow.small_trouble,
      flow.tiny_trouble
    ]
    return troubles.map((trouble, index) => {
      return(
        <span key={index}>
          {trouble ? trouble.name : ""} {troubles[index +1] ? " > " : ""}
        </span>
      )
    });
  }

  renderGroupButton() {
    return (
      <div className="group-button center">
        <cm.RaisedButton
          secondary={true}
          onClick={this.handleClose}
          label={t("common.cancel")}
        />
        <cm.RaisedButton
          primary={true}
          onClick={this.handleImport}
          style={{marginLeft: 15}}
          label={t("common.ok")}
        />
      </div>
    );
  }

  renderFLowDetail() {
    let flow = this.state.flow;
    if (!flow) return null;

    let isComplexFlow = flow.todos.length > 1 ? true : false;

    return (
      <div className="flow-detail">
        <div className="flow-infor">
          <div className="flow-header">
            <label>
              <i className="material-icons" style={{color: theme.secondaryColor}}>account_circle</i>
              {flow.creator.name}
            </label>
            <label>{t("common.attributes.created_at")}:{flow.created_at}</label>
            <label>{t("common.attributes.updated_at")}:{flow.updated_at}</label>
          </div>
          <div className="flow-name">
            <span className={(isComplexFlow ? "complex" : "single") + " flow-type"}>
              {isComplexFlow ? t("flows.complex") : t("flows.single")}
            </span>
            {flow.name}
          </div>
          <div className="other-info">
            <div className="row">
              <span className="col-md-6">
                <i className="material-icons" style={{color: theme.secondaryColor}}>
                  perm_phone_msg
                </i>
                {this.renderClientLineList()}
              </span>
              <span className="col-md-6">
                <i className="material-icons" style={{color: theme.secondaryColor}}>
                  assignment_turned_in
                </i>
                {this.renderTagList()}
              </span>
            </div>
            <div className="row">
              <span className="col-md-6">
                <i className="material-icons" style={{color: theme.secondaryColor}}>warning</i>
                {this.renderTroubleList()}
              </span>
              <span className="col-md-6">
                <i className="material-icons" style={{color: theme.secondaryColor}}>view_list</i>
                {flow.step ? flow.step.name : ""}
              </span>
            </div>
          </div>
        </div>
        <div className="todo-list awesome-scroll">
          <NavigationContent
            onlyView={true}
            showStepBar={false}
            flow={this.state.flow}
          />
        </div>
        {this.props.flow ? this.renderGroupButton() : null}
      </div>
    );
  }

  renderBackButton() {
    return (
      <cm.RaisedButton
        primary={true}
        label={t("common.back")}
        onClick={() => Helper.history.goBack()}
        icon={<i className="material-icons">chevron_left</i>}
        style={{color: "white", margin: "20px"}}
      />
    );
  }

  render() {
    return (
      <div className="flow-detail-container">
        {this.props.flow ? null : this.renderBackButton()}
        {this.renderFLowDetail()}
      </div>
    );
  }
}
