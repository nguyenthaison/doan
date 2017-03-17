class CommunitySerializer < ActiveModel::Serializer
  attributes *Community.column_names, :attachments, :teams, :big_trouble,
    :medium_trouble, :small_trouble, :tiny_trouble, :faquestion_tags, :client_faquestion_lines

  has_many :teams

  def attachments
    object.attachments.map(&:as_json)
  end

  def client_faquestion_lines
    object.client_community_lines.map do |client_line|
      {id: client_line.id, client: client_line.client, line: client_line.line}
    end
  end

  def faquestion_tags
    object.community_tags.map do |tag|
      {id: tag.id, tag: tag.tag, parent_tag: tag.parent_tag}
    end
  end
end
