class Todo < ActiveRecord::Base
  include SmartAsJson

  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:title, :content, :navigation_step_id, :category, :node_id,
    :parent_todo_id, :navigation_id, :flow_id, attachment_ids: [],
    nodes_attributes: [:id, :name, :_destroy]]
  enum category: [:text, :flow]

  belongs_to :navigation_step
  belongs_to :node
  belongs_to :navigation
  belongs_to :parent_todo, class_name: Todo.name, foreign_key: "parent_todo_id"
  belongs_to :flow

  has_many :nodes, dependent: :destroy
  has_many :attachments, as: :attachmentable, dependent: :destroy

  validates :title, presence: true, length: {maximum: 100}
  validates :content, presence: true, length: {maximum: 600}
  validate :need_nodes

  accepts_nested_attributes_for :nodes, allow_destroy: true

  scope :filter_by_navigation_step_id, -> navigation_step_id do
    where "navigation_step_id = ?", navigation_step_id
  end

  private
  def need_nodes
    if self.nodes.all?(&:marked_for_destruction?) && self.flow?
      errors.add :node, I18n.t("todos.errors.need_nodes")
    end
  end
end
