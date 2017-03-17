import ActionSearch from "material-ui/svg-icons/action/search";

export default class SearchForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      shortName: this.props.defaultSelectedClient ? this.props.defaultSelectedClient.short_name : "",
      selectedClient: this.props.defaultSelectedClient,
      selectedLine: this.props.defaultSelectedLine,
      clients: [],
      lines: [],
    }
  }

  componentDidMount() {
    API.Client.getList((status, data) => this.handleGetListCallback("clients", status, data), {
      only: ["id", "name", "short_name"],
      filter: {ownership: App.auth.id},
    });
    API.Line.getList((status, data) => this.handleGetListCallback("lines", status, data), {
      only: ["id", "name", "client_id"],
      filter: {ownership: App.auth.id},
    });
  }

  findClientByShortName(shortName) {
    return this.state.clients.find(client =>
      client.short_name === shortName.toUpperCase());
  }

  getListLineFollowingClient(client) {
    return client ? this.state.lines.filter(line => line.client_id === client.id) : []
  }

  getSelectedLine() {
    return this.state.selectedLine;
  }

  handleGetListCallback = (type, status, data) => {
    if (!status) return;
    this.setState({
      [type]: data[type],
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
          className="input-short-name"
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
      <div className="search-container clearfix">
        <div className="input-search">
          <div className="row">
            <div className="col-xs-4">
              {this.renderInputShortName()}
            </div>
            <div className="col-xs-4">
              {this.renderSelectClient()}
            </div>
            <div className="col-xs-4">
              {this.renderSelectLine()}
            </div>
          </div>
        </div>
        <div className="btn-submit-wp">
          <cm.RaisedButton
            className="btn-submit"
            onTouchTap={this.props.onSubmitSearch}
            label={t("common.search")}
            primary={true}
            icon={<ActionSearch />}
          />
        </div>

      </div>
    )
  }
}
