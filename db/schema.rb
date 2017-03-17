# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170315091915) do

  create_table "attachments", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "attachmentable_id"
    t.string   "attachmentable_type"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.string   "attachment_file_name"
    t.string   "attachment_content_type"
    t.integer  "attachment_file_size"
    t.datetime "attachment_updated_at"
    t.index ["attachmentable_type", "attachmentable_id"], name: "index_attachments_on_attachmentable_type_and_attachmentable_id", using: :btree
  end

  create_table "bookmark_folders", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "name"
    t.integer  "parent_id"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "field_id"
  end

  create_table "bookmarks", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "name"
    t.integer  "bookmark_folder_id"
    t.string   "description"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "deleted_at"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "url"
    t.index ["bookmark_folder_id"], name: "index_bookmarks_on_bookmark_folder_id", using: :btree
  end

  create_table "claims", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "title"
    t.integer  "field_id"
    t.text     "content",    limit: 65535
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "deleted_at"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.index ["field_id"], name: "index_claims_on_field_id", using: :btree
  end

  create_table "client_community_lines", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer "client_id"
    t.integer "community_id"
    t.integer "line_id"
    t.index ["client_id"], name: "index_client_community_lines_on_client_id", using: :btree
    t.index ["community_id"], name: "index_client_community_lines_on_community_id", using: :btree
    t.index ["line_id"], name: "index_client_community_lines_on_line_id", using: :btree
  end

  create_table "client_faquestion_lines", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "client_id"
    t.integer  "faquestion_id"
    t.integer  "line_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["client_id"], name: "index_client_faquestion_lines_on_client_id", using: :btree
    t.index ["faquestion_id"], name: "index_client_faquestion_lines_on_faquestion_id", using: :btree
    t.index ["line_id"], name: "index_client_faquestion_lines_on_line_id", using: :btree
  end

  create_table "client_flow_lines", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer "client_id"
    t.integer "flow_id"
    t.integer "line_id"
    t.index ["client_id"], name: "index_client_flow_lines_on_client_id", using: :btree
    t.index ["flow_id"], name: "index_client_flow_lines_on_flow_id", using: :btree
    t.index ["line_id"], name: "index_client_flow_lines_on_line_id", using: :btree
  end

  create_table "client_notification_lines", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "notification_id"
    t.integer  "client_id"
    t.integer  "line_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["client_id"], name: "index_client_notification_lines_on_client_id", using: :btree
    t.index ["line_id"], name: "index_client_notification_lines_on_line_id", using: :btree
    t.index ["notification_id"], name: "index_client_notification_lines_on_notification_id", using: :btree
  end

  create_table "client_user_lines", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "client_id"
    t.integer  "user_id"
    t.integer  "line_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_client_user_lines_on_client_id", using: :btree
    t.index ["line_id"], name: "index_client_user_lines_on_line_id", using: :btree
    t.index ["user_id"], name: "index_client_user_lines_on_user_id", using: :btree
  end

  create_table "clients", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "name"
    t.string   "code"
    t.string   "name_kana"
    t.string   "short_name"
    t.text     "address",      limit: 65535
    t.string   "phone_number"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.text     "notes",        limit: 65535
    t.datetime "deleted_at"
    t.integer  "field_id"
    t.index ["deleted_at"], name: "index_clients_on_deleted_at", using: :btree
    t.index ["field_id"], name: "index_clients_on_field_id", using: :btree
  end

  create_table "comment_users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "user_id"
    t.integer  "comment_id"
    t.boolean  "vote",       default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["comment_id"], name: "index_comment_users_on_comment_id", using: :btree
    t.index ["user_id"], name: "index_comment_users_on_user_id", using: :btree
  end

  create_table "comments", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.text     "content",          limit: 65535
    t.integer  "votes",                          default: 0
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "deleted_at"
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.index ["deleted_at"], name: "index_comments_on_deleted_at", using: :btree
  end

  create_table "communities", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "title"
    t.text     "question",          limit: 65535
    t.integer  "priority"
    t.integer  "views",                           default: 0
    t.integer  "helpfuls",                        default: 0
    t.integer  "favorites",                       default: 0
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.integer  "user_id"
    t.integer  "big_trouble_id"
    t.integer  "medium_trouble_id"
    t.integer  "small_trouble_id"
    t.integer  "tiny_trouble_id"
    t.integer  "comment_count",                   default: 0
    t.datetime "deleted_at"
    t.boolean  "moved_to_faq",                    default: false
    t.integer  "field_id"
    t.index ["field_id"], name: "index_communities_on_field_id", using: :btree
  end

  create_table "community_tags", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "community_id"
    t.integer  "tag_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "parent_tag_id"
    t.index ["community_id"], name: "index_community_tags_on_community_id", using: :btree
    t.index ["tag_id"], name: "index_community_tags_on_tag_id", using: :btree
  end

  create_table "community_teams", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "team_id"
    t.integer  "community_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["community_id"], name: "index_community_teams_on_community_id", using: :btree
    t.index ["team_id"], name: "index_community_teams_on_team_id", using: :btree
  end

  create_table "community_users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "community_id"
    t.integer  "user_id"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.boolean  "helpful",      default: false
    t.boolean  "favorite",     default: false
    t.boolean  "view",         default: false
    t.datetime "favorited_at"
    t.index ["community_id"], name: "index_community_users_on_community_id", using: :btree
    t.index ["user_id"], name: "index_community_users_on_user_id", using: :btree
  end

  create_table "companies", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "name"
    t.string   "name_kana"
    t.string   "postal_code"
    t.string   "address"
    t.string   "phone_number"
    t.string   "fax"
    t.string   "name_PIC"
    t.string   "name_kana_PIC"
    t.integer  "user_id"
    t.string   "billing_address_zip"
    t.string   "billing_address"
    t.string   "phone_number_billing"
    t.string   "fax_billing"
    t.string   "name_PIC_billing"
    t.string   "name_kana_PIC_billing"
    t.text     "notes",                 limit: 65535
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["user_id"], name: "index_companies_on_user_id", using: :btree
  end

  create_table "departments", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "name"
    t.text     "notes",           limit: 65535
    t.integer  "organization_id"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "deleted_at"
    t.integer  "company_id"
    t.index ["company_id"], name: "index_departments_on_company_id", using: :btree
    t.index ["deleted_at"], name: "index_departments_on_deleted_at", using: :btree
    t.index ["organization_id"], name: "index_departments_on_organization_id", using: :btree
  end

  create_table "faquestion_tags", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "faquestion_id"
    t.integer  "tag_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "parent_tag_id"
    t.index ["faquestion_id"], name: "index_faquestion_tags_on_faquestion_id", using: :btree
    t.index ["tag_id"], name: "index_faquestion_tags_on_tag_id", using: :btree
  end

  create_table "faquestion_teams", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "faquestion_id"
    t.integer  "team_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["faquestion_id"], name: "index_faquestion_teams_on_faquestion_id", using: :btree
    t.index ["team_id"], name: "index_faquestion_teams_on_team_id", using: :btree
  end

  create_table "faquestion_users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "faquestion_id"
    t.integer  "user_id"
    t.boolean  "favorite",      default: false
    t.boolean  "helpful",       default: false
    t.boolean  "view",          default: false
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.datetime "favorited_at"
    t.index ["faquestion_id"], name: "index_faquestion_users_on_faquestion_id", using: :btree
    t.index ["user_id"], name: "index_faquestion_users_on_user_id", using: :btree
  end

  create_table "faquestions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "user_id"
    t.string   "title"
    t.text     "question",          limit: 65535
    t.text     "answer",            limit: 65535
    t.integer  "views",                           default: 0
    t.integer  "helpfuls",                        default: 0
    t.integer  "favorites",                       default: 0
    t.integer  "priority"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.integer  "big_trouble_id"
    t.integer  "medium_trouble_id"
    t.integer  "small_trouble_id"
    t.integer  "tiny_trouble_id"
    t.datetime "deleted_at"
    t.integer  "community_id"
    t.integer  "field_id"
    t.index ["field_id"], name: "index_faquestions_on_field_id", using: :btree
    t.index ["user_id"], name: "index_faquestions_on_user_id", using: :btree
  end

  create_table "feeds", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "url"
    t.string   "title"
    t.string   "rss_source_id"
    t.text     "description",   limit: 65535
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "field_id"
    t.index ["field_id"], name: "index_feeds_on_field_id", using: :btree
  end

  create_table "fields", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "name"
    t.date     "contract_start_date"
    t.date     "contract_end_date"
    t.integer  "company_id"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.datetime "deleted_at"
    t.integer  "style"
    t.index ["company_id"], name: "index_fields_on_company_id", using: :btree
  end

  create_table "flow_tags", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer "flow_id"
    t.integer "tag_id"
    t.integer "parent_tag_id"
    t.index ["flow_id"], name: "index_flow_tags_on_flow_id", using: :btree
    t.index ["tag_id"], name: "index_flow_tags_on_tag_id", using: :btree
  end

  create_table "flows", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "name"
    t.integer  "step_id"
    t.integer  "big_trouble_id"
    t.integer  "medium_trouble_id"
    t.integer  "small_trouble_id"
    t.integer  "tiny_trouble_id"
    t.integer  "field_id"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
    t.index ["step_id"], name: "index_flows_on_step_id", using: :btree
  end

  create_table "folders", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "name"
    t.integer  "parent_id"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "field_id"
    t.integer  "lft"
    t.integer  "rgt"
  end

  create_table "helps", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.boolean  "is_checked",    default: false
    t.integer  "navigation_id"
    t.integer  "user_id"
    t.datetime "deleted_at"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.integer  "field_id"
    t.integer  "announcer"
    t.index ["navigation_id"], name: "index_helps_on_navigation_id", using: :btree
    t.index ["user_id"], name: "index_helps_on_user_id", using: :btree
  end

  create_table "line_troubles", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "line_id"
    t.integer  "big_trouble_id"
    t.integer  "medium_trouble_id"
    t.integer  "small_trouble_id"
    t.integer  "tiny_trouble_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["line_id"], name: "index_line_troubles_on_line_id", using: :btree
  end

  create_table "lines", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "code"
    t.string   "name"
    t.string   "name_kana"
    t.string   "free_dial_number"
    t.integer  "user_id"
    t.integer  "trouble_id"
    t.integer  "client_id"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.text     "notes",            limit: 65535
    t.datetime "deleted_at"
    t.integer  "field_id"
    t.index ["client_id"], name: "index_lines_on_client_id", using: :btree
    t.index ["deleted_at"], name: "index_lines_on_deleted_at", using: :btree
    t.index ["field_id"], name: "index_lines_on_field_id", using: :btree
    t.index ["trouble_id"], name: "index_lines_on_trouble_id", using: :btree
    t.index ["user_id"], name: "index_lines_on_user_id", using: :btree
  end

  create_table "manual_files", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "folder_id"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "deleted_at"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "attachment_file_name"
    t.string   "attachment_content_type"
    t.integer  "attachment_file_size"
    t.datetime "attachment_updated_at"
    t.text     "link_file",               limit: 65535
    t.string   "file_name"
    t.index ["folder_id"], name: "index_manual_files_on_folder_id", using: :btree
  end

  create_table "navigation_steps", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "navigation_id"
    t.integer  "step_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.datetime "deleted_at"
    t.index ["navigation_id"], name: "index_navigation_steps_on_navigation_id", using: :btree
    t.index ["step_id"], name: "index_navigation_steps_on_step_id", using: :btree
  end

  create_table "navigations", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "client_id"
    t.integer  "line_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.integer  "field_id"
    t.datetime "deleted_at"
    t.datetime "publish_date"
    t.index ["client_id"], name: "index_navigations_on_client_id", using: :btree
    t.index ["line_id"], name: "index_navigations_on_line_id", using: :btree
  end

  create_table "nodes", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "name"
    t.integer  "todo_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.index ["todo_id"], name: "index_nodes_on_todo_id", using: :btree
  end

  create_table "notification_address_teams", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "organization_id"
    t.integer  "department_id"
    t.integer  "team_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "notification_address_id"
    t.index ["department_id"], name: "index_notification_address_teams_on_department_id", using: :btree
    t.index ["notification_address_id"], name: "index_notification_address_teams_on_notification_address_id", using: :btree
    t.index ["organization_id"], name: "index_notification_address_teams_on_organization_id", using: :btree
    t.index ["team_id"], name: "index_notification_address_teams_on_team_id", using: :btree
  end

  create_table "notification_addresses", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "company_id"
    t.integer  "user_id"
    t.integer  "notification_type", default: 0
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.integer  "field_id"
    t.index ["company_id"], name: "index_notification_addresses_on_company_id", using: :btree
    t.index ["field_id"], name: "index_notification_addresses_on_field_id", using: :btree
    t.index ["user_id"], name: "index_notification_addresses_on_user_id", using: :btree
  end

  create_table "notification_notes", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "notification_id"
    t.text     "content",         limit: 65535
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.index ["notification_id"], name: "index_notification_notes_on_notification_id", using: :btree
  end

  create_table "notification_tags", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "notification_id"
    t.integer  "tag_id"
    t.integer  "parent_tag_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["notification_id"], name: "index_notification_tags_on_notification_id", using: :btree
    t.index ["tag_id"], name: "index_notification_tags_on_tag_id", using: :btree
  end

  create_table "notification_teams", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "notification_id"
    t.integer  "team_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["notification_id"], name: "index_notification_teams_on_notification_id", using: :btree
    t.index ["team_id"], name: "index_notification_teams_on_team_id", using: :btree
  end

  create_table "notification_users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "notification_id"
    t.integer  "user_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["notification_id"], name: "index_notification_users_on_notification_id", using: :btree
    t.index ["user_id"], name: "index_notification_users_on_user_id", using: :btree
  end

  create_table "notifications", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "title"
    t.text     "content",       limit: 65535
    t.integer  "priority"
    t.date     "start_date"
    t.date     "end_date"
    t.integer  "comment_count",               default: 0
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.integer  "field_id"
    t.index ["field_id"], name: "index_notifications_on_field_id", using: :btree
  end

  create_table "organizations", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "name"
    t.text     "notes",      limit: 65535
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "deleted_at"
    t.integer  "company_id"
    t.index ["company_id"], name: "index_organizations_on_company_id", using: :btree
    t.index ["deleted_at"], name: "index_organizations_on_deleted_at", using: :btree
  end

  create_table "positions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "name"
    t.text     "notes",      limit: 65535
    t.integer  "company_id"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_positions_on_deleted_at", using: :btree
  end

  create_table "rss_sources", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "url"
    t.string   "title"
    t.integer  "field_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["field_id"], name: "index_rss_sources_on_field_id", using: :btree
  end

  create_table "settings", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "key"
    t.text     "content",    limit: 65535
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "deleted_at"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "field_id"
    t.index ["field_id"], name: "index_settings_on_field_id", using: :btree
  end

  create_table "steps", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "name"
    t.boolean  "active",     default: true
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "field_id"
    t.index ["field_id"], name: "index_steps_on_field_id", using: :btree
  end

  create_table "tags", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "name"
    t.text     "notes",        limit: 65535
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.integer  "parent_id",                  default: 0
    t.integer  "order_number"
    t.datetime "deleted_at"
    t.integer  "field_id"
    t.index ["deleted_at"], name: "index_tags_on_deleted_at", using: :btree
    t.index ["field_id"], name: "index_tags_on_field_id", using: :btree
  end

  create_table "teams", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "name"
    t.text     "notes",         limit: 65535
    t.integer  "field_id"
    t.integer  "department_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "deleted_at"
    t.integer  "company_id"
    t.index ["company_id"], name: "index_teams_on_company_id", using: :btree
    t.index ["deleted_at"], name: "index_teams_on_deleted_at", using: :btree
    t.index ["department_id"], name: "index_teams_on_department_id", using: :btree
    t.index ["field_id"], name: "index_teams_on_field_id", using: :btree
  end

  create_table "todos", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "title"
    t.text     "content",            limit: 65535
    t.integer  "navigation_step_id"
    t.integer  "node_id"
    t.integer  "category"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.integer  "navigation_id"
    t.integer  "parent_todo_id"
    t.datetime "deleted_at"
    t.integer  "flow_id"
    t.index ["navigation_id"], name: "index_todos_on_navigation_id", using: :btree
    t.index ["navigation_step_id"], name: "index_todos_on_navigation_step_id", using: :btree
  end

  create_table "trouble_names", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "key"
    t.string   "name"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "field_id"
    t.index ["field_id"], name: "index_trouble_names_on_field_id", using: :btree
  end

  create_table "troubles", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "code"
    t.string   "name"
    t.integer  "parent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "deleted_at"
    t.integer  "field_id"
    t.index ["deleted_at"], name: "index_troubles_on_deleted_at", using: :btree
    t.index ["field_id"], name: "index_troubles_on_field_id", using: :btree
  end

  create_table "user_activities", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "community_id"
    t.integer  "comment_id"
    t.integer  "user_id"
    t.string   "activity_type"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["comment_id"], name: "index_user_activities_on_comment_id", using: :btree
    t.index ["community_id"], name: "index_user_activities_on_community_id", using: :btree
    t.index ["user_id"], name: "index_user_activities_on_user_id", using: :btree
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string   "email",                                default: ""
    t.string   "encrypted_password",                   default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                        default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "login_id"
    t.string   "name_kana"
    t.string   "avatar"
    t.integer  "role",                                 default: 1
    t.string   "phone_number"
    t.text     "notes",                  limit: 65535
    t.string   "internal_number"
    t.integer  "department_id"
    t.integer  "team_id"
    t.integer  "position_id"
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
    t.string   "name"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.integer  "organization_id"
    t.datetime "deleted_at"
    t.integer  "company_id"
    t.index ["company_id"], name: "index_users_on_company_id", using: :btree
    t.index ["deleted_at"], name: "index_users_on_deleted_at", using: :btree
    t.index ["department_id"], name: "index_users_on_department_id", using: :btree
    t.index ["position_id"], name: "index_users_on_position_id", using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["team_id"], name: "index_users_on_team_id", using: :btree
  end

  add_foreign_key "bookmarks", "bookmark_folders"
  add_foreign_key "client_flow_lines", "clients"
  add_foreign_key "client_flow_lines", "flows"
  add_foreign_key "client_flow_lines", "lines"
  add_foreign_key "client_user_lines", "clients"
  add_foreign_key "client_user_lines", "lines"
  add_foreign_key "client_user_lines", "users"
  add_foreign_key "clients", "fields"
  add_foreign_key "communities", "fields"
  add_foreign_key "faquestions", "fields"
  add_foreign_key "feeds", "fields"
  add_foreign_key "fields", "companies"
  add_foreign_key "flow_tags", "flows"
  add_foreign_key "flow_tags", "tags"
  add_foreign_key "flows", "steps"
  add_foreign_key "lines", "fields"
  add_foreign_key "manual_files", "folders"
  add_foreign_key "notification_address_teams", "departments"
  add_foreign_key "notification_address_teams", "notification_addresses"
  add_foreign_key "notification_address_teams", "organizations"
  add_foreign_key "notification_address_teams", "teams"
  add_foreign_key "notification_addresses", "fields"
  add_foreign_key "notifications", "fields"
  add_foreign_key "settings", "fields"
  add_foreign_key "steps", "fields"
  add_foreign_key "tags", "fields"
  add_foreign_key "teams", "fields"
  add_foreign_key "todos", "navigations"
  add_foreign_key "trouble_names", "fields"
  add_foreign_key "troubles", "fields"
  add_foreign_key "user_activities", "comments"
  add_foreign_key "user_activities", "communities"
end
