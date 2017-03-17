import TroubleDetail from "./TroubleDetail";
import ContentSave from "material-ui/svg-icons/content/save";

export default class TroubleForm extends BaseMaster.Form {
  constructor(props) {
    super(props);
    this.apiName = "Trouble";
    this.objectDetail = TroubleDetail;

    this.state = update(this.state, {$merge: {
      data: {
        bigTrouble: {},
        mediumTrouble: {},
        smallTrouble: {},
      },
      troubles: [],
      errorText: "",
    }})
    this.troubleKeys = ["big_trouble", "medium_trouble", "small_trouble", "tiny_trouble"];
    this.tableName = "troubles";
    this.transPath = "master.troubles";
  }

  getDataForSubmit() {
    if (this.state.data.id) return this.state.data;
    let deep = this.additionData.deep;
    let trouble = this.state.data[this.troubleKeys[deep - 1]];
    if (trouble) {
      let parentId = deep === 0 ? 0 : trouble.id;
      return update(this.state.data, {
        parent_id: {$set: parentId},
      });
    }
    if (deep !== 0) return this.state.data;
    return update(this.state.data, {
      parent_id: {$set: 0},
    });
  }

  handleValidateFail(errors) {
    let deep = this.additionData.deep;
    let trouble = this.state.data;
    if (errors.parent_id) {
      for(let i = 0; i < deep; i++) {
        if (!trouble[this.troubleKeys[i]]) {
          errors = update(errors, {[this.troubleKeys[i]]: {$set: errors.parent_id}});
        }
      }
    }
    this.setState({
      errors: errors,
    });
  }

  renderTrouble () {
    if (!this.additionData || this.additionData.deep == 0) return;
    let troubleSelectFields = [];
    for (let i = 0; i < this.additionData.deep; i++) {
      let parentId = 0;
      if (i) {
        let parentTroubleKey = this.troubleKeys[i - 1];
        let parent = this.state.data[parentTroubleKey] || {};
        parentId = parent.id;
      }
      let troubleKey = this.troubleKeys[i];
      let selectedTrouble = this.state.data[troubleKey] || {};
      troubleSelectFields.push(
        this.renderSelectField(troubleKey, selectedTrouble.id, this.additionData.troubles, {
          key: i,
          filterKey: "parent_id",
          filterValue: parentId,
          required: true,
        })
      )
    }
    return troubleSelectFields;
  }

  renderTroubleEdit(data) {
    if (!this.additionData || this.additionData.deep == 0) return;
    let troubleSelectFields = [];
    let tmpTrouble = data;
    let deep = this.additionData.deep;

    for (let i = deep - 1; i >= 0; i--) {
      let parentId = tmpTrouble.parent_id;
      tmpTrouble = this.additionData.troubles.filter(trouble => trouble.id === parentId)[0];
      troubleSelectFields[i] = (
        this.renderSelectField(this.troubleKeys[i], tmpTrouble.id, this.additionData.troubles, {
          key: i,
          filterKey: "id",
          filterValue: parentId,
          disabled: true,
          required: true,
        })
      )
    }
    return troubleSelectFields;
  }

  renderDialogContent = () => {
    let trouble = this.state.data;
    let deep = this.additionData.deep;
    let nameLabel = t(`master.troubles.attributes.${this.troubleKeys[deep]}`);

    return(
      <div>
        <div className="row">
          <div className="col-xs-6">
            {this.renderTextInput("code",
              {maxLength: 10, required: true})}
            {this.renderTextInput("name", {
                fieldName: nameLabel,
                hintText: nameLabel,
                required: true,
                maxLength: 40,
            })}
          </div>
          <div className="col-xs-6">
            {trouble.id ? this.renderTroubleEdit(trouble) : this.renderTrouble()}
          </div>
        </div>
      </div>
    )
  }
}
