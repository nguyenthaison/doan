export default class FieldTeam extends BaseComponent {
  static defaultProps = {
    allowAddingTeamHasField: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedOrganization: {},
      selectedDepartment: {},
      selectedTeam: {},
      organizations: [],
      departments: [],
      teams: [],
      chosenTeams: this.props.defaultTeams || [],
    };
  }

  componentDidMount() {
    API.Organization.getList((status, data) =>
      this.handleGetListCallback("organizations", status, data));
    API.Department.getList((status, data) =>
      this.handleGetListCallback("departments", status, data));
    API.Team.getList((status, data) =>
      this.handleGetListCallback("teams", status, data));
  }

  handleGetListCallback = (type, status, data) => {
    if (!status) return;

    let newState = update(this.state, {[type]: {$set: data[type]}});
    this.setState(newState);
  }

  getChosenTeamIds() {
    let team_ids = this.state.chosenTeams.map(team => team.id)
    return team_ids;
  }

  getChosenTeams() {
    return this.state.chosenTeams;
  }

  getSelectedTeamIds() {
    return this.state.chosenTeams.map((fieldTeam) => {
      return {
        organization_id: fieldTeam.department.organization.id,
        department_id: fieldTeam.department.id,
        team_id: fieldTeam.id,
      }
    })
  }

  removeTeamFromList = (fieldTeam) => {
    let teams = this.state.teams;
    let selectedTeam = this.state.selectedTeam;
    if (!this.props.allowAddingTeamHasField) {
      let index = teams.findIndex(team => team.id === fieldTeam.id);
      teams = update(teams, {[index]: {field_id: {$set: null}}});

      if (selectedTeam.id === fieldTeam.id) {
        selectedTeam = update(selectedTeam, {field_id: {$set: null}})
      }
    }

    let chosenTeams = this.state.chosenTeams.filter((value) => {
      return fieldTeam.id !== value.id;
    });

    this.setState({
      selectedTeam: selectedTeam,
      teams: teams,
      chosenTeams: chosenTeams,
    });
  }

  handleClickAddTeam = () => {
    let selectedTeam = this.state.selectedTeam;

    if (selectedTeam.field_id && !this.props.allowAddingTeamHasField) {
      return Helper.showErrors(t("company.fields.notice"));
    }

    let selectedOrganization = this.state.selectedOrganization;
    let selectedDepartment = this.state.selectedDepartment;
    let chosenTeams = this.state.chosenTeams;

    if (chosenTeams.findIndex(fieldTeam =>
      fieldTeam.id === selectedTeam.id) === -1) {
      chosenTeams = update(chosenTeams,
        {$push: [{
          id: selectedTeam.id,
          name: selectedTeam.name,
          department: {
            id: selectedDepartment.id,
            name: selectedDepartment.name,
            organization: selectedOrganization,
          }
        }]});
    }

    this.setState({
      chosenTeams: chosenTeams,
    })
  }

  getObjectFromId(items, id) {
    return items.find(item => item.id === id);
  }

  handleChangeSelectField = (fieldName, items, selectedId) => {
    let capitalFieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    let obj = this.getObjectFromId(items, selectedId)
    let newState = update(this.state, {
        [`selected${capitalFieldName}`]: {$set: obj},
      }
    );

    switch(fieldName) {
    case "organization":
      newState = update(newState, {$merge: {
        selectedDepartment: {},
        selectedTeam: {},
      }});
    case "department":
      newState = update(newState, {$merge: {
        selectedTeam: {},
      }});
    }

    this.setState(newState);
  }

  renderSelectItemContent(itemContent, selectedItemId, listItem, options) {
    return (
      <div className="form-group">
        {this.renderLabel(itemContent)} <br />
        <div>
          <cm.SelectField
            value={selectedItemId}
            onChange={(event, key, payload) => this.handleChangeSelectField(itemContent, listItem, payload)}
            items={listItem}
            fullWidth={true}
            {...options}
          />
        </div>
      </div>
    )
  }

  renderLabel(label) {
    return (
      <label className="small-label">
        {t(`company.fields.${label}`)}
      </label>
    );
  }

  renderTeamsList() {
    return (
      <mui.List className="list lines-list awesome-scroll">
        {
          this.state.chosenTeams.map((fieldTeam) => {
            let organization = fieldTeam.department.organization;
            let department = fieldTeam.department;
            let content = organization.name + " > " + department.name + " > " + fieldTeam.name;
            return (
              <mui.ListItem
                key={fieldTeam.id}
                primaryText={
                  <span className="ellipsis-text" title={content}>
                    {content}
                  </span>
                }
                rightIcon={
                  <mui.FontIcon
                    className="material-icons"
                    onClick={() => this.removeTeamFromList(fieldTeam)}>cancel
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
    let company_id = App.auth.company ? App.auth.company.id : null;

    return (
      <div className="row common-line mg0">
        <div className="col-md-6 left">
          {this.renderSelectItemContent("organization", this.state.selectedOrganization.id, this.state.organizations, {
            filterKey: "company_id",
            filterValue: company_id,
          })}
          {this.renderSelectItemContent("department", this.state.selectedDepartment.id, this.state.departments, {
            filterKey: "organization_id",
            filterValue: this.state.selectedOrganization.id,
          })}
          {this.renderSelectItemContent("team", this.state.selectedTeam.id, this.state.teams, {
            filterKey: "department_id",
            filterValue: this.state.selectedDepartment.id,
          })}
          <cm.RaisedButton
            primary={true}
            label={t("common.add")}
            onClick={this.handleClickAddTeam}
            disabled={!this.state.selectedTeam.id}
            className="pull-right"
            style={{margin: 12}}
          />
        </div>
        <div className="row col-md-6 right-panel">
          {this.renderTeamsList()}
        </div>
      </div>
    );
  }
}
