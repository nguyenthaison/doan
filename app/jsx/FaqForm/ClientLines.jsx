
export default class ClientLines extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      shortName: "",
      suggestions: [],
      selectedClient: null,
      selectedLine: null,
      clients: [],
      lines: [],
      chosenClientLines: this.props.defaultChosenClientLines || [],
    };
  }

  getChosenLines() {
    return this.state.chosenClientLines;
  }

  getChosenLineIds() {
    return this.state.chosenClientLines.map((clientLine) => {
      return {
        client_id: clientLine.client.id,
        line_id: clientLine.line ? clientLine.line.id : null,
      }
    })
  }

  callAPI(options = {}) {
    API.Client.getList(this.handleGetClientListCallback, {
      only: ["id", "name", "short_name"],
      filter: options.filter,
    });
    API.Line.getList(this.handleGetLineListCallback, {
      only: ["id", "name", "client_id"],
      filter: options.filter,
    });
  }
  componentDidMount() {
    let filter = this.props.fieldId ? {field_id: this.props.fieldId} : {};

    this.callAPI({filter: filter});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fieldId !== this.props.fieldId) {
      let filter = {field_id: nextProps.fieldId};

      this.callAPI({filter: filter});
      this.setState({chosenClientLines: []});
    }
  }

  handleGetClientListCallback = (status, data) => {
    if (!status) return;
    this.setState({
      clients: data.clients,
    });
  }

  handleGetLineListCallback = (status, data) => {
    if (!status) return;
    this.setState({
      lines: data.lines,
    });
  }

  handleShortNameChange = (value) => {
    this.setState({
      shortName: value,
    }, () => {
      let shortName = value.replace(/(?![a-zA-Z0-9])./g, '')
      if (shortName.length > 3) {
        shortName = shortName.slice(0,3);
      }

      this.setState({
        shortName: shortName.toUpperCase(),
        selectedClient: this.findClientByShortName(shortName),
        selectedLine: null,
      });
    });
  }

  handleNewShortNameRequest = (value) => {
    let shortName = value.short_name.toUpperCase();
    this.setState({
      shortName: shortName,
      selectedClient: this.findClientByShortName(shortName),
      selectedLine: null
    });
  }

  handleClientChange = (clientId) => {
    let client = this.state.clients.find(item => item.id === clientId);
    let shortName = client ? client.short_name : "";

    this.setState({
      shortName: shortName,
      selectedClient: client,
      selectedLine: null,
    });
  }

  handleLineChange = (lineId) => {
    let line = this.state.lines.find(item => item.id === lineId);

    this.setState({
      selectedLine: line,
    });
  }

  handleClickAddLine = () => {
    let selectedClient = this.state.selectedClient;
    let selectedLine = this.state.selectedLine;
    let chosenClientLines = this.state.chosenClientLines;

    if (selectedClient && !selectedLine) {
      chosenClientLines = chosenClientLines.filter((clientLine) =>
        !clientLine.line || clientLine.client.id !== selectedClient.id);

      if (!chosenClientLines.find((clientLine) => clientLine.client.id === selectedClient.id)) {
        chosenClientLines = update(chosenClientLines, {$push: [{client: selectedClient}]});
      }
    } else if (selectedLine) {
      let canPush = true;
      for (let i = 0; i < chosenClientLines.length; i++) {
        if (!chosenClientLines[i].line && chosenClientLines[i].client.id === selectedClient.id
          || chosenClientLines[i].line && chosenClientLines[i].line.id === selectedLine.id) {
          canPush = false;
        }
      }
      if (canPush) {
        chosenClientLines = update(chosenClientLines, {$push: [{line: selectedLine, client: selectedClient}]});
      }
    }

    this.setState({
      chosenClientLines: chosenClientLines,
    });

    if (this.props.onAdditionChangeData) this.props.onAdditionChangeData();
  }

  removeLineFromList = (clientLine) => {
    let chosenClientLines = this.state.chosenClientLines.filter((value) => {
      if (clientLine.line) {
        return !value.line || value.line && clientLine.line.id !== value.line.id;
      } else {
        return clientLine.client.id !== value.client.id;
      }
    });

    this.setState({
      chosenClientLines: chosenClientLines
    });

    if (this.props.onAdditionChangeData) this.props.onAdditionChangeData();
  }

  findClientByShortName(shortName) {
    return this.state.clients.find(client =>
      client.short_name === shortName.toUpperCase());
  }

  getListLineFollowingClient(client) {
    return client ? this.state.lines.filter(line => line.client_id === client.id) : []
  }

  renderLabel(label) {
    return (
      <label className="small-label">
        {t(`faquestions.client_lines.${label}`)}
      </label>
    );
  }

  renderInputShortName() {
    return (
      <div className="form-group">
        {this.renderLabel("short_name")} <br />
        <mui.AutoComplete
          searchText={this.state.shortName}
          hintText={t("faquestions.client_lines.placeholder.short_name")}
          fullWidth={true}
          maxLength="3"
          openOnFocus={true}
          dataSource={this.state.clients}
          dataSourceConfig={{text: 'short_name', value: 'short_name'}}
          onUpdateInput={this.handleShortNameChange}
          onNewRequest={this.handleNewShortNameRequest}
        />
      </div>
    )
  }

  renderSelectClient() {
    let selectedClient = this.state.selectedClient;
    let title = selectedClient ? selectedClient.name : ""

    return (
      <div className="form-group">
        {this.renderLabel("client")} <br />
        <div title={title}>
          <cm.SelectField
            items={this.state.clients}
            fullWidth={true}
            value={selectedClient ? selectedClient.id : null}
            onChange={(event, key, payload) => this.handleClientChange(payload)}>
          </cm.SelectField>
        </div>
      </div>
    )
  }

  renderSelectLine() {
    let selectedLine = this.state.selectedLine;
    let title = selectedLine ? selectedLine.name : "";

    return (
      <div className="form-group">
        {this.renderLabel("line")} <br />
        <div title={title}>
          <cm.SelectField
            items={this.state.lines}
            value={selectedLine ? selectedLine.id : null}
            fullWidth={true}
            filterKey="client_id"
            filterValue={this.state.selectedClient ? this.state.selectedClient.id : null}
            onChange={(event, key, payload) => this.handleLineChange(payload)}>
          </cm.SelectField>
        </div>
      </div>
    )
  }

  renderLinesList() {
    return (
      <mui.List className="list lines-list awesome-scroll">
        {
          this.state.chosenClientLines.map((clientLine, index) => {
            let client = clientLine.client;
            let lineNameFormat = clientLine.line ? " > " + clientLine.line.name : "";

            return (
              <mui.ListItem
                key={index}
                primaryText={
                  <span className="ellipsis-text">
                    {client.short_name + lineNameFormat}
                  </span>
                }
                rightIcon={
                  <mui.FontIcon
                    className="material-icons"
                    onClick={() => this.removeLineFromList(clientLine)}>cancel
                  </mui.FontIcon>
                }
              />
            )
          })
        }
      </mui.List>
    )
  }

  render() {
    return (
      <div className="row common-line">
        <div className="col-md-6 left">
          {this.renderInputShortName()}
          {this.renderSelectClient()}
          {this.renderSelectLine()}
          <cm.RaisedButton
            primary={true}
            label={t("common.add")}
            onClick={this.handleClickAddLine}
            disabled={!this.state.selectedClient}
            className="pull-right"
            style={{margin: 12}}
          />
        </div>
        <div className="row col-md-6 right-panel">
          {this.renderLinesList()}
        </div>
      </div>
    );
  }
}
