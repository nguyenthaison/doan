import ClaimForm from "./ClaimForm";
import Claim from "./Claim";
import AddCircleOutline from "material-ui/svg-icons/content/add-circle-outline";

export default class ClaimList extends PageComponent {
  constructor(props) {
    super(props);

    this.state = {
      claims: [],
      showClaimForm: false,
      editingId: null,
    };
  }

  componentDidMount() {
    API.Claim.getList(this.handleGetListClaimCallBack, this.getOptions());
  }

  getOptions() {
    let include = {attachments: {}};

    return {
      include: JSON.stringify(include),
    }
  }

  findIndexClaim(claimId) {
    let index = this.state.claims.findIndex(_claim => {
      return claimId === _claim.id;
    });

    return index;
  }

  handleGetListClaimCallBack = (status, data) => {
    if (!status) return;

    this.setState({
      claims: data.claims,
    });
  }

  handleCreateClaim = (claim) => {
    let claims = update(this.state.claims, {$push: [claim]});

    this.setState({
      claims: claims,
      showClaimForm: false,
    });
  }

  handleUpdateClaim = (claim) => {
    let index = this.findIndexClaim(claim.id);
    let claims = update(this.state.claims, {[index]: {$set: claim}});

    this.setState({
      editingId: null,
      claims: claims,
    });
  }

  handleDeleteClaim = (claim) => {
    let index = this.findIndexClaim(claim.id)
    let claims = update(this.state.claims, {$splice: [[index, 1]]});

    this.setState({
      claims: claims,
    });
  }

  handleShowClaimForm = () => {
    this.setState({
      editingId: null,
      showClaimForm: true,
    });
  }

  handleCloseClaimForm = () => {
    this.setState({
      showClaimForm: false,
    });
  }

  handleEditClaim = (claim) => {
    this.setState({
      editingId: claim.id,
      showClaimForm: false
    });
  }

  handleCloseEditClaimForm = () => {
    this.setState({
      editingId: null,
    });
  }

  renderClaimsList() {
    let claims = this.state.claims;

    return this.state.claims.map(claim => {
      let isEditing = claim.id === this.state.editingId ? true : false;

      return (
        <Claim
          showButtonEditAndDelete={this.props.showButtonEditAndDelete}
          key={claim.id}
          claim={claim}
          onUpdate={this.handleUpdateClaim}
          onClose={this.handleCloseEditClaimForm}
          isEditing={isEditing}
          onEdit={this.handleEditClaim}
          onDelete={this.handleDeleteClaim}
        />);
    });
  }

  renderButtonCreate() {
    return (
      <cm.RaisedButton
        icon={<AddCircleOutline />}
        className="add-new-claim"
        fullWidth={true}
        primary={true}
        label={t("common.create")}
        onTouchTap={this.handleShowClaimForm}
      />
    )
  }

  render() {
    let icon = <i className="material-icons icon-header">sentiment_very_dissatisfied</i>;
    let showButtonEditAndDelete = this.props.showButtonEditAndDelete;

    return (
      <div className="todo-list claim-list">
        {this.renderClaimsList()}
        {showButtonEditAndDelete ? (this.state.showClaimForm ?
          <ClaimForm
            onClose={this.handleCloseClaimForm}
            onCreate={this.handleCreateClaim}
          /> : this.renderButtonCreate()) : null
        }
      </div>
    )
  }
}
