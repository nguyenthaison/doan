export default class Tags extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      chosenFaqTags: this.props.defaultFaqTags || [],
    };
  }

  getChosenTagIds() {
    return this.state.chosenFaqTags.map((faqTag) => {
      return {
        parent_tag_id: faqTag.parent_tag.id,
        tag_id: faqTag.tag ? faqTag.tag.id : null,
      }
    });
  }

  getChosenTags() {
    return this.state.chosenFaqTags;
  }

  componentDidMount() {
    API.Tag.getList(this.handleGetTagsListCallback, {
      only: ["id", "name", "parent_id"],
    });
  }

  handleGetTagsListCallback = (status, data) => {
    if (!status) return;
    this.setState({
      tags: data.tags,
    });
  }

  handleParentTagChange = (tag) => {
    this.setState({
      selectedParentTag: tag,
      selectedChildTag: null,
    });
  }

  handleChildTagChange = (childTag) => {
    this.setState({
      selectedChildTag: childTag,
    });
  }

  handleClickAddTag = () => {
    let selectedParentTag = this.state.selectedParentTag;
    let selectedChildTag = this.state.selectedChildTag;
    let chosenFaqTags = this.state.chosenFaqTags;

    if (selectedParentTag && !selectedChildTag) {
      chosenFaqTags = chosenFaqTags.filter((faqTag) =>
        !faqTag.tag || faqTag.parent_tag.id !== selectedParentTag.id);

      if (!chosenFaqTags.find((faqTag) => faqTag.parent_tag.id === selectedParentTag.id)) {
        chosenFaqTags = update(chosenFaqTags, {$push: [{parent_tag: selectedParentTag}]});
      }
    } else if (selectedChildTag) {
      let canPush = true;
      for (let i = 0; i < chosenFaqTags.length; i++) {
        if (!chosenFaqTags[i].tag && chosenFaqTags[i].parent_tag.id === selectedParentTag.id
          || chosenFaqTags[i].tag && chosenFaqTags[i].tag.id === selectedChildTag.id) {
          canPush = false;
        }
      }
      if (canPush) {
        chosenFaqTags = update(chosenFaqTags, {$push: [{tag: selectedChildTag, parent_tag: selectedParentTag}]});
      }
    }

    this.setState({
      chosenFaqTags: chosenFaqTags,
    });

    if (this.props.onAdditionChangeData) this.props.onAdditionChangeData();
  }

  handleRemoveTagFromList = (faqTag) => {
    let chosenFaqTags = this.state.chosenFaqTags.filter((value) => {
      if (faqTag.tag) {
        return !value.tag || value.tag && faqTag.tag.id !== value.tag.id;
      } else {
        return faqTag.parent_tag.id !== value.parent_tag.id;
      }
    });

    this.setState({
      chosenFaqTags: chosenFaqTags
    });

    if (this.props.onAdditionChangeData) this.props.onAdditionChangeData();
  }

  getTagsFollowingParentTag(parentTag) {
    return parentTag ? this.state.tags.filter(tag => tag.parent_id === parentTag.id): [];
  }

  renderLabel(fieldName) {
    return(
      <label className="small-label">
        {t(`faquestions.tags.${fieldName}`)}
      </label>
    );
  }

  renderParentTags() {
    let parentTags = this.state.tags.filter(tag => tag.parent_id === 0);
    return (
      <div className="form-group">
        {this.renderLabel("big")}
        <mui.SelectField
          value={this.state.selectedParentTag}
          labelStyle={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
          fullWidth={true}
          onChange={(event, key, payload) => this.handleParentTagChange(payload)}
        >
          {
            parentTags.map((tag) => {
              return <mui.MenuItem key={tag.id} value={tag} primaryText={tag.name} />
            })
          }
        </mui.SelectField>
      </div>
    );
  }

  renderChildTags() {
    let tags = this.getTagsFollowingParentTag(this.state.selectedParentTag);
    return (
      <div className="form-group">
        {this.renderLabel("small")} <br />
        <mui.SelectField
          value={this.state.selectedChildTag}
          labelStyle={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
          fullWidth={true}
          onChange={(event, key, payload) => this.handleChildTagChange(payload)}
        >
          {
            tags.map((tag) => {
              return <mui.MenuItem key={tag.id} value={tag} primaryText={tag.name} />
            })
          }
        </mui.SelectField>
      </div>
    );
  }

  renderTagsList() {
    return (
      <mui.List className="list tags-list awesome-scroll">
        {
          this.state.chosenFaqTags.map((faqTag, index) => {
            let childTagFormat = faqTag.tag ? " > " + faqTag.tag.name : "";
            return (
              <mui.ListItem
                key={index}
                primaryText={
                  <span className="ellipsis-text">
                    {faqTag.parent_tag.name + childTagFormat}
                  </span>
                }
                rightIcon={
                  <mui.FontIcon
                    className="material-icons"
                    onClick={() => this.handleRemoveTagFromList(faqTag)}>cancel
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
      <div className="row common-tag">
        <div className="col-md-6 left">
          {this.renderParentTags()}
          {this.renderChildTags()}
          <cm.RaisedButton
            primary={true}
            label={t("common.add")}
            onClick={this.handleClickAddTag}
            disabled={!this.state.selectedParentTag}
            className="pull-right"
            style={{margin: 12}}
          />
        </div>
        <div className="col-md-6">
          {this.renderTagsList()}
        </div>
      </div>
    )
  }
}
