class FlowTag < ActiveRecord::Base
  belongs_to :tag
  belongs_to :flow
  belongs_to :parent_tag, class_name: Tag.name, foreign_key: "parent_tag_id"
end
