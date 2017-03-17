import ArrowRight from "material-ui/svg-icons/hardware/keyboard-arrow-right";
import Divider from "material-ui/Divider";

export default class ChangeFieldDrawer extends BaseComponent {
  constructor(props) {
    super(props);
  }

  open = () => {
    this.refs.drawer.open();
  }

  handleChangeField = (fieldId) => {
    API.Authentication.changeField(this.handleChangeFieldCallBack, fieldId)
  }

  handleChangeFieldCallBack = () => {
    window.location = "/";
  }

  renderMenuItem(primaryText, fieldId, options = {}) {
    let selectedClass = App.auth.field_id === fieldId ? "selected-field" : "";

    return <mui.MenuItem
      key={fieldId}
      className={`menu-item ${selectedClass}`}
      primaryText={primaryText}
      leftIcon={<ArrowRight />}
      onClick={() => this.handleChangeField(fieldId)}
    />
  }

  render() {
    let fields = App.auth.fields || [];

    return (
      <cm.Drawer
        ref="drawer"
        className="change-field-drawer"
      >
        <mui.AppBar
          className="app-bar"
          title={t("app.change_field_drawer.change_field")}
          iconElementLeft={<mui.IconButton><i className="material-icons">swap_vert</i></mui.IconButton>}
        />

        <mui.Menu>
          {this.renderMenuItem(t("app.change_field_drawer.admin_page"), null)}
          <Divider />
          {fields.map((field) => {
            return this.renderMenuItem(field.name, field.id);
          })}
        </mui.Menu>
      </cm.Drawer>
    );
  }
}
