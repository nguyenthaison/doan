export default class ClientLines extends BaseComponent {
  constructor(props) {
    super(props);

    let client = this.props.client;

    this.state = {
      shortName: client ? client.short_name : "",
      selectedClient: client,
      clients: [],
      lines: [],
    };
  }

  componentDidMount() {
    API.Client.getList(this.handleGetClientListCallback, {
      only: ["id", "name", "short_name"],
      filter: {ownership: App.auth.id},
    });
    API.Line.getList(this.handleGetLineListCallback, {
      only: ["id", "name", "client_id"],
      filter: {ownership: App.auth.id},
    });
  }

  getSelectedClienLineId() {
    return {
      client_id: this.state.selectedClient ? this.state.selectedClient.id: null,
      line_id: this.state.selectedLine ? this.state.selectedLine.id: null,
    };
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
      let shortName = value.replace(/(?![a-zA-Z0-9])./g, '');

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
      selectedLine: null,
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

  findClientByShortName(shortName) {
    return this.state.clients.find(client =>
      client.short_name === shortName.toUpperCase());
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
    );
  }

  renderSelectClient() {
    let selectedClient = this.state.selectedClient;
    let title = selectedClient ? selectedClient.name : "";

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

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          {this.renderInputShortName()}
          {this.renderSelectClient()}
          {this.renderSelectLine()}
        </div>
      </div>
    );
  }
}
