class AuthenticationSerializer < ActiveModel::Serializer
  attributes :id, :name, :organization_name, :department_name, :team, :authorized_pages,
    :settings, :role, :position_name, :company, :field_id, :fields, :notice_helps_size,
    :field_style, :field_logo, :small_field_logo, :root_folder_id, :notice_team_ids,
    :root_bookmark_id, :environment

  def initialize user, options={}
    super
    @options = options
  end

  def fields
    company = object.company
    company && company.fields.active.as_json(only: ["id", "name"])
  end

  def organization_name
    object.organization ? object.organization.name : ""
  end

  def department_name
    object.department ? object.department.name : ""
  end

  def position_name
    object.position ? object.position.name : ""
  end

  def settings
    Setting.where key: "announcement", field_id: field_id
  end

  def field_id
    @options[:field_id]
  end

  def environment
    Rails.env
  end

  def notice_helps_size
    helps = Help.includes(:user).where(field_id: field_id, is_checked: false)
    return helps.size if object.admin?

    team_ids = notice_team_ids
    helps = helps.joins(:user).where("users.team_id IS NULL OR
      users.team_id IN (?)", notice_team_ids)
    helps.size
  end

  def field_style
    if !object.pms_admin? && field_id
      field = ::Field.find field_id
      field.style
    else
      ""
    end
  end

  def field_logo
    if !object.pms_admin? && field_id
      field = ::Field.find field_id
      field.attachments.first
    else
      nil
    end
  end

  def small_field_logo
    if !object.pms_admin? && field_id
      field = ::Field.find field_id
      field.small_attachments.first
    else
      nil
    end
  end

  def root_folder_id
    root_folder = Folder.find_by field_id: field_id, parent_id: nil
    root_folder ? root_folder.id : nil
  end

  def root_bookmark_id
    BookmarkFolder.find_by(field_id: field_id, parent_id: nil).try "id"
  end

  def notice_team_ids
    object.notification_addresses.joins(:notification_address_teams)
      .where(notification_type: "help", field_id: field_id).distinct.pluck(:team_id)
  end

  def authorized_pages
    member_auth = {
      top: true,
      faqs: {
        new: false,
        edit: true,
        clone: true,
      },
      notifications: {
        new: true,
        edit: true,
      },
      communities: {
        new: true,
        edit: true,
      },
      myPage: true,
      navigations: true,
      manual_files: true,
      bookmarks: true,
    }

    manager_auth = member_auth.deep_merge({
      faqs: {
        new: true,
      },
      company: {
        users: true,
      },
      master: {
        clients: true,
        tags: true,
        troubles: {
          list: true,
          name: true,
        },
        notificationAddresses: true,
      },
      masterNavigation: {
        stepConfig: true,
        navigations: true,
        flows: {
          new: true,
          edit: true,
          clone: true,
        },
        claims: true,
      },
      manual_files: {
        new_folder: true,
        upload: true,
        download: true,
        edit: true,
        delete: true,
      },
      bookmarks: {
        new: true,
        edit: true,
        delete: true,
      },
    })

    admin_auth = {
      company: {
        users: true,
        organizations: true,
        positions: true,
        fields: true,
      },
    }

    pms_admin_auth = {
      pmsSetting: {
        companies: true,
        fields: true,
        users: true,
        organizations: true,
        positions: true,
      },
    }

    role = object.admin? && @options[:field_id] ? "manager" : object.role
    eval "#{role}_auth"
  end
end
