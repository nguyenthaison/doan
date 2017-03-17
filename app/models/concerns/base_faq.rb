module BaseFaq
  extend ActiveSupport::Concern
  REACTIONS = ["helpful", "favorite"]
  TROUBLE_FIELDS = [
    "big_trouble_id",
    "medium_trouble_id",
    "small_trouble_id",
    "tiny_trouble_id",
  ]

  def find_related type
    filter_obj = type.capitalize == self.class.name ? "AND #{type.pluralize}.id <> #{self.id}" : ""

    type.classify.constantize.order(views: :desc).
      joins("LEFT JOIN
        client_#{type}_lines ON client_#{type}_lines.#{type}_id = #{type.pluralize}.id").
      joins("LEFT JOIN
        #{type}_tags ON #{type}_tags.#{type}_id = #{type.pluralize}.id").
      where("(#{type}_tags.tag_id IN (?) OR
        client_#{type}_lines.line_id IN (?) #{self.create_sub_trouble_query})
        #{filter_obj}",
        self.tag_ids.uniq, self.line_ids.uniq).
        distinct.limit(10)
  end

  def update_reaction reaction_type, current_user
    transaction do
      faq_user = create_or_update_faq_user reaction_type, current_user
      reaction_number = send reaction_type.pluralize
      reaction_number_change =
        faq_user.send(reaction_type) ? reaction_number + 1 : reaction_number - 1
      update_attribute reaction_type.pluralize, reaction_number_change
      reaction = {}
      reaction[reaction_type.pluralize.to_sym] = send reaction_type.pluralize
      reaction.merge!(id: id, faq_user: faq_user)
    end
  end

  def create_or_update_faq_user reaction_type, current_user
    faq_user_class_type = (self.class.name + "User").singularize.constantize
    faq_user_attr = self.class.name.downcase + "_id"
    faq_user = faq_user_class_type.find_or_create_by faq_user_attr => id, "user_id" => current_user.id
    if reaction_type == "favorite"
      faq_user.send(reaction_type) ? favorited_at = nil : favorited_at = Time.now
      faq_user.update favorited_at: favorited_at, "#{reaction_type}": !faq_user.send(reaction_type)
    else
      faq_user.update_attribute reaction_type, !faq_user.send(reaction_type)
    end
    faq_user
  end

  def json_data options = {}, current_user
    faq_users = send self.class.name.downcase + "_users"
    options[:include] ||= {}

    comments = self.class.reflect_on_association(:comments) ? self.comments.order(created_at: :desc) : []

    faquestion_id = if self.class.reflect_on_association(:faquestion) && self.faquestion
      faquestion.id
    else
      nil
    end

    comments = comments.present? ? comments.includes(:attachments, :creator).map {|comment|
      CommunityCommentSerializer.new comment, {current_user: current_user}} : []

    as_json(options).merge({
      comments: comments,
      faq_user: faq_users.detect{|faq_user| faq_user.user_id == current_user.id},
      faquestion_id: faquestion_id,
      authorized: {helpful: current_user.can?(:update_helpful, self)},
    })
  end

  def create_sub_trouble_query
    query = ""
    troubles = {
      tiny_trouble_id: tiny_trouble_id,
      small_trouble_id: small_trouble_id,
      medium_trouble_id: medium_trouble_id,
      big_trouble_id: big_trouble_id
    }

    troubles.each do |key, value|
      if value
        query = "OR #{key.to_s} = #{value}"
        break
      end
    end
    query
  end

  def authorized current_user
    {helpful: current_user.can?(:update_helpful, self)}
  end

  module ClassMethods
    def custom_json_for_index faquestions, faquestion_users, current_user
      faquestions.map do |faq|
        faq.as_json.merge({
          faq_user: find_faquestion_user(faq, faquestion_users),
          authorized: {helpful: current_user.can?(:update_helpful, faq)}
        })
      end
    end

    def find_faquestion_user faq, faquestion_users
      faquestion_users.detect{|faq_user| faq_user.faquestion_id == faq.id}
    end

    def search_by params, class_name, user
      order_by = params[:order_by] || "id"
      order_by = "#{order_by} desc"
      search_info = params[:search_query] || {}
      team_id = user.team_id

      client_line_table = "client_#{class_name.downcase}_lines".to_sym
      tag_table = "#{class_name.downcase}_tags".to_sym

      faquestions = class_name.constantize.all
      filter = params[:filter] || {}
      filter.each do |key, value|
        faquestions = faquestions.where("#{key} = ?", value) if value.present?
      end

      if search_info["lines"] || search_info["clients"]
        faquestions = faquestions.joins(client_line_table).where("line_id IN (?) OR client_id IN (?)",
          search_info["lines"], search_info["clients"]).distinct
      end
      if search_info["child_tags"] || search_info["parent_tags"]
        faquestions = faquestions.joins(tag_table).where("tag_id IN (?) OR parent_tag_id IN (?)",
          search_info["child_tags"], search_info["parent_tags"]).distinct
      end

      search_info.each do |key, value|
        case key
        when "troubles"
          trouble_field = BaseFaq::TROUBLE_FIELDS[value.length - 1]
          faquestions = faquestions.where "#{trouble_field} = ?", value.last
        when "query"
          value = value.squish.gsub /( and )|( or )/i, " and " => "and", " or " => "or"
          value = value.gsub /\s/, "and"
          query_array = value.split /(and)|(or)/i
          query_array.pop if ["and", "or"].include? query_array.last.downcase unless query_array.empty?

          query_array = query_array.map do |child_query|
            ["and", "or"].include?(child_query.downcase) ? child_query :
              "(#{sub_query_for_text_search(class_name, child_query)})"
          end

          faquestions = faquestions.where query_array.join
        end
      end
      total_result = faquestions.count
      [total_result, faquestions.order(order_by).order("created_at desc").limit(params[:take])]
    end

    def search_by_query search_query
      search_info = search_query || {}

      client_line_table = "client_#{model_name.singular}_lines".to_sym
      tag_table = "#{model_name.singular}_tags".to_sym

      faquestions = model_name.name.constantize.all

      if search_info["lines"] || search_info["clients"]
        faquestions = faquestions.joins(client_line_table).where("line_id IN (?) OR client_id IN (?)",
          search_info["lines"], search_info["clients"]).distinct
      end
      if search_info["child_tags"] || search_info["parent_tags"]
        faquestions = faquestions.joins(tag_table).where("tag_id IN (?) OR parent_tag_id IN (?)",
          search_info["child_tags"], search_info["parent_tags"]).distinct
      end

      search_info.each do |key, value|
        case key
        when "troubles"
          trouble_field = BaseFaq::TROUBLE_FIELDS[value.length - 1]
          faquestions = faquestions.where "#{trouble_field} = ?", value.last
        when "query"
          value = value.squish.gsub /( and )|( or )/i, " and " => "and", " or " => "or"
          value = value.gsub /\s/, "and"
          query_array = value.split /(and)|(or)/i
          query_array.pop if ["and", "or"].include? query_array.last.downcase unless query_array.empty?

          query_array = query_array.map do |child_query|
            ["and", "or"].include?(child_query.downcase) ? child_query :
              "(#{sub_query_for_text_search(model_name.name, child_query)})"
          end

          faquestions = faquestions.where query_array.join
        end
      end
      faquestions
    end

    private
    def sub_query_for_text_search class_name, query
      query = query || ""
      like_query = "%#{sanitize_sql_like query.strip}%"

      sql_query = sanitize_sql_array ["#{class_name.downcase.pluralize}.id = :query OR title LIKE
        :like_query OR question LIKE :like_query", query: query, like_query: like_query]
      answer_params = class_name == Faquestion.name ? "OR answer LIKE :like_query" : ""
      sql_query += sanitize_sql_array [answer_params, like_query: like_query]
    end
  end
end
