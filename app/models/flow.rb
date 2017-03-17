class Flow < ActiveRecord::Base
  include SmartAsJson
  include Userstamp

  TROUBLE_FIELDS = [
    "big_trouble_id",
    "medium_trouble_id",
    "small_trouble_id",
    "tiny_trouble_id",
  ]

  FLOW_ATTRIBUTES_PARAMS = [:name, :step_id, :big_trouble_id, :medium_trouble_id,
    :small_trouble_id, :tiny_trouble_id, client_flow_lines_attributes:
    [:id, :client_id, :line_id], flow_tags_attributes: [:id, :tag_id, :parent_tag_id]]
  ALLOWED_METHODS = [:todo_num]

  belongs_to :step
  belongs_to :big_trouble, class_name: Trouble.name, foreign_key: "big_trouble_id"
  belongs_to :medium_trouble, class_name: Trouble.name, foreign_key: "medium_trouble_id"
  belongs_to :small_trouble, class_name: Trouble.name, foreign_key: "small_trouble_id"
  belongs_to :tiny_trouble, class_name: Trouble.name, foreign_key: "tiny_trouble_id"

  has_many :client_flow_lines, dependent: :destroy
  has_many :clients, through: :client_flow_lines
  has_many :lines, through: :client_flow_lines
  has_many :flow_tags, dependent: :destroy
  has_many :tags, through: :flow_tags
  has_many :parent_tag, through: :flow_tags
  has_many :todos, dependent: :destroy

  validates :name, presence: true

  accepts_nested_attributes_for :client_flow_lines
  accepts_nested_attributes_for :flow_tags

  scope :filter_by_client_line_ids, ->(client_line_ids) do
    joins(:client_flow_lines).where("line_id IN (?) OR client_id IN (?)",
      client_line_ids["line_ids"], client_line_ids["client_ids"])
  end

  scope :filter_by_trouble_ids, ->(trouble_ids) do
    trouble_field = Flow::TROUBLE_FIELDS[trouble_ids.length - 1]
    where "#{trouble_field} = ?", trouble_ids.last
  end

  scope :filter_by_tag_ids, ->(tag_ids) do
    joins(:flow_tags).where("tag_id IN (?) OR parent_tag_id IN (?)",
      tag_ids["child_tag_ids"], tag_ids["parent_tag_ids"])
  end

  scope :filter_by_step_ids, ->(step_ids) do
    where "step_id IN (?)", step_ids
  end

  acts_as_paranoid

  def clone_todo original_todo, parent_todo_id = nil, node_id = nil
    return unless original_todo

    copy_todo_attributes = {
      title: original_todo.title,
      content: original_todo.content,
      flow_id: self.id,
      category: original_todo.category,
      node_id: node_id,
      parent_todo_id: parent_todo_id,
      attachments: Attachment.clone_attachments(original_todo.attachments),
    }

    copy_todo = Todo.new copy_todo_attributes
    copy_todo.save validate: false

    if original_todo.text?
      child_todo = Todo.find_by parent_todo_id: original_todo.id
      clone_todo child_todo, copy_todo.id
    else
      nodes = original_todo.nodes

      nodes.each do |node|
        copy_node = Node.create name: node.name, todo_id: copy_todo.id

        if node.todo
          clone_todo node.todo, copy_todo.id, copy_node.id
        end
      end
    end
  end

  def todo_num
    todos.length
  end

  class << self
    def search_by_query query
      transformed_query = query.squish.gsub /( and )|( or )/i, " and " => "and", " or " => "or"
      transformed_query = transformed_query.gsub /\s/, "and"
      query_array = transformed_query.split /(and)|(or)/i
      query_array.pop if ["and", "or"].include? query_array.last.downcase unless query_array.empty?

      query_array = query_array.map do |child_query|
        ["and", "or"].include?(child_query.downcase) ? child_query :
          "(#{sub_query_for_text_search child_query})"
      end

      Flow.where query_array.join
    end

    private
    def sub_query_for_text_search query
      query = query || ""
      like_query = "%#{sanitize_sql_like query.strip}%"

      sanitize_sql_array ["flows.id = :query OR name LIKE :like_query",
        query: query, like_query: like_query]
    end
  end

  def json_data options = {}
    options = options.deep_merge({
      include: {
        client_flow_lines: {include: {client: {}, line: {}}},
        big_trouble: {},
        medium_trouble: {},
        small_trouble: {},
        tiny_trouble: {},
        flow_tags: {include: {tag: {}, parent_tag: {}}},
        todos: {include:
          {nodes: {}, parent_todo: {}, attachments: {}},
        },
      },
    })

    as_json options
  end
end
