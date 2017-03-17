import Place from 'material-ui/svg-icons/maps/place';

export default class TeamList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      checkedTeams: this.props.defaultCheckedTeams || [],
    };
  }

  componentDidMount() {
    API.Team.getList(this.handleGetTeamListCallback, {
      only: ["id", "name"],
    });
  }

  getCheckedTeamIds() {
    return this.state.checkedTeams.map(team => team.id);
  }

  getCheckedTeams() {
    return this.state.checkedTeams;
  }

  handleCheckAllTeam = () => {
    if (this.state.checkedTeams.length == this.state.teams.length){
      this.setState({
        checkedTeams: [],
      });
    } else {
      let checkedTeams = update(this.state.teams, {});
      this.setState({
        checkedTeams: checkedTeams,
      });
    }
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

  handleGetTeamListCallback = (status, data) => {
    if (!status) return;
    this.setState({
      teams: data.teams
    });
  }

  handleChangeTeam = (team) => {
    let checkedTeams = this.state.checkedTeams;
    let index = checkedTeams.findIndex(checkedTeam => checkedTeam.id === team.id);

    if (index != -1) {
      checkedTeams.splice(index, 1);
    } else {
      checkedTeams.push(team);
    }

    this.setState({
      checkedTeams: checkedTeams,
    });
  }

  renderListTeam = () => {
    let checkedTeams = this.getCheckedTeams();
    return this.state.teams.map((team) => {
      let isChecked = checkedTeams.findIndex(checkedTeam => checkedTeam.id === team.id) != -1;
      return (
        <div key={team.id} className="col-md-4">
          <mui.Checkbox
            onClick={() => this.handleChangeTeam(team)}
            label={team.name}
            checked={isChecked}
          />
        </div>
      );
    });
  }

  renderTitle() {
    return (
      <div>
        <Place style={{color: theme.primary1Color}} className="form-section-icon" />
        {this.renderLabel("team", true)}
      </div>
    );
  }

  render() {
    return (
      <div className="col-md-10 form-group section-teams">
        {this.props.withoutTitle ? null : this.renderTitle()}
        <mui.Checkbox
          checked={this.state.checkedTeams.length == this.state.teams.length && this.state.teams.length !== 0}
          onCheck={this.handleCheckAllTeam}
          style={{width: "auto", position: "inherit", display: "inline-flex", float: "right", whiteSpace: "nowrap"}}
          label={t("common.checkbox.check_all")}
        />
        <div className="clearfix"></div>
        <div className="row team-list">{this.renderListTeam()}</div>
      </div>
    );
  }
}

TeamList.defaultProps = {
  withoutTitle: false,
};
