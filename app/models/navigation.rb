class Navigation < ActiveRecord::Base
  include SmartAsJson
  include Search
  include Userstamp

  ATTRIBUTE_PARAMS = %i[client_id line_id publish_date]
  ALLOWED_METHODS = [:published]

  belongs_to :client
  belongs_to :line

  has_many :navigation_steps, dependent: :destroy
  has_many :steps, through: :navigation_steps
  has_many :todos
  has_many :helps, dependent: :destroy

  validates :client_id, :line_id, presence: true
  validate :check_only_one_published

  acts_as_paranoid

  scope :filter_by_published, ->(boolean) do
    boolean == "true" ? where("publish_date < ?", Time.now) : all
  end

  def check_only_one_published
    if published
      Navigation.where(line_id: self.line_id).each do |navigation|
        if navigation.published
          errors.add(:line_id, I18n.t("navigations.one_published"))
          return false
        end
      end
    end
  end

  def published
    publish_date && Time.now >= publish_date
  end

  def clone_navigation_data original_navigation
    step_ids = original_navigation.step_ids
    self.update_attributes step_ids: step_ids
    first_original_todo = original_navigation.todos.first

    clone_todo first_original_todo
  end

  def import_flow navigation_step_id, flow_id, parent_todo_id, node_id
    flow = Flow.find flow_id
    first_todo = flow.todos.first
    @new_copy_todos = []
    clone_todo first_todo, parent_todo_id, node_id, navigation_step_id

    @new_copy_todos
  end

  def clone_todo original_todo, parent_todo_id = nil, node_id = nil, navigation_step_id = nil
    return unless original_todo

    if original_todo.navigation_step
      navigation_step_id = NavigationStep.find_by(step_id: original_todo.navigation_step.step_id,
        navigation_id: self.id).id
    end

    copy_todo_attributes = {
      title: original_todo.title,
      content: original_todo.content,
      navigation_step_id: navigation_step_id,
      category: original_todo.category,
      navigation_id: self.id,
      node_id: node_id,
      parent_todo_id: parent_todo_id,
      attachments: Attachment.clone_attachments(original_todo.attachments),
    }

    copy_todo = Todo.new copy_todo_attributes
    copy_todo.save validate: false

    unless original_todo.navigation_step
      @new_copy_todos << copy_todo
    end

    if original_todo.text?
      child_todo = Todo.find_by parent_todo_id: original_todo.id
      clone_todo child_todo, copy_todo.id, nil, navigation_step_id
    else
      nodes = original_todo.nodes

      nodes.each do |node|
        copy_node = Node.create name: node.name, todo_id: copy_todo.id

        if node.todo
          clone_todo node.todo, copy_todo.id, copy_node.id, navigation_step_id
        end
      end
    end
  end

  def as_json options = {}
    super(options).merge(publish_date: self[:publish_date].try(:strftime, '%Y-%m-%d %H:%M'))
  end

  class << self
    def search_by_query search_query
      navigations = Navigation.joins(:client, :line).where("clients.name LIKE ?
        OR clients.short_name LIKE ? OR lines.name LIKE ?
        OR navigations.id = ?", *(["%#{sanitize_sql_like search_query.strip}%"]*4))
    end
  end
end
