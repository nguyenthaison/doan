def insert_batch data, class_name, field = nil
  data.each_with_index do |val, i|
    val[:field] = field if field

    date = DateTime.now + i.seconds
    val[:created_at] = date
    val[:updated_at] = date

    class_name.classify.constantize.create val
  end
end

pms = Company.create! name: "PMS", name_kana: "pms", address: "Japan",
  postal_code: "123456", phone_number: "123456",
  name_PIC: "PMS", name_kana_PIC: "PMS"
framgia = Company.create! name: "Framgia", name_kana: "Framgia", address: "Keangnam",
  postal_code: "123456", phone_number: "123456",
  name_PIC: "Framgia", name_kana_PIC: "Framgia"

fields = ["Home", "Park", "Street"]
fields.each do |name|
  Field.create! name: name,
    contract_start_date: DateTime.now, contract_end_date: nil,
    company: framgia
end

home_field = Field.first

div1 = Organization.create! name: "Division 1", company: framgia
div2 = Organization.create! name: "Division 2", company: framgia
div3 = Organization.create! name: "Division 3", company: framgia

group1 = Department.create! name: "Group 1", company: framgia, organization: div1

["FAQ", "Colanttote", "Repair", "Line Bot", "Minpaku"].each do |name|
  Team.create! name: name, department: group1, field: home_field,
    company: framgia
end

framgia_team = Team.last

User.create! login_id: "pms", password: "123123", name: "pms", role: "pms_admin"
User.create! login_id: "admin_f", password: "123123", name: "admin_framgia",
    role: "admin", company: framgia

roles = ["member", "manager"]
roles.each do |role|
  User.create! login_id: "#{role}_f", password: "123123", name: "#{role}_framgia",
    role: role, company: framgia, organization: div1, department: group1, team: framgia_team
end

Position.create! [
  {name: "MG", notes: "Manager", company: framgia},
  {name: "RD", notes: "Leader", company: framgia},
  {name: "SV", notes: "Section V", company: framgia},
  {name: "OP", notes: "One Piece", company: framgia},
]

require Rails.root.to_s + "/db/clients.rb"
insert_batch @clients, "client", home_field

require Rails.root.to_s + "/db/lines.rb"
insert_batch @lines, "line", home_field

require Rails.root.to_s + "/db/troubles.rb"
insert_batch @troubles, "trouble", home_field

require Rails.root.to_s + "/db/trouble_names.rb"
insert_batch @trouble_names, "trouble_name", home_field

NO_RECORDS = 30

big_tags = []
NO_RECORDS.times.each do |i|
  big_tags.push name: "Big Tag #{i}", notes: "Note #{i}", order_number: i, parent_id: 0
end
insert_batch big_tags, "tag", home_field

big_tag = Tag.last
big_tag.update name: "Big tag with small tags"

small_tags = []
NO_RECORDS.times.each do |i|
  small_tags.push name: "Small Tag #{i}", notes: "Note #{i}",
    parent_id: big_tag.id, order_number: NO_RECORDS + i
end
insert_batch small_tags, "tag", home_field

priority = ["low", "medium", "high"]
faqs = []
NO_RECORDS.times.each do |i|
  faqs.push title: "Faquestion #{i}", question: "Question #{i}",
    answer: "Answer #{i}", priority: priority[i%3], teams: [framgia_team]
end
insert_batch faqs, "faquestion", home_field

communities = []
NO_RECORDS.times.each do |i|
  communities.push title: "Community #{i}", question: "Question #{i}",
    priority: priority[i%3], teams: [framgia_team]
end
insert_batch communities, "community", home_field

admin_framgia = User.find_by company: framgia, role: 2
community = Community.last
community.update title: "Community with comments", comment_count: NO_RECORDS
comments = []
NO_RECORDS.times.each do |i|
  comments.push content: "Comment #{i}", commentable_id: community.id,
    commentable_type: "Community", creator: admin_framgia
end
insert_batch comments, "comment"
