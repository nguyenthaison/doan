export default {
  common: {
    create: "Create",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    detail: "Detail",
    cancel: "Cancel",
    copy: "Copy",
    sign_out: "Sign out",
    add: "Add",
    submit: "Submit",
    close: "Close",
    update: "Update",
    back: "Back",
    ok: "Ok",
    add: "Add",
    required: "Required",
    search: "Search",
    confirmation: "Confirmation",
    done: "Done",
    show_more: "Show more",
    no_deadline: "No Deadline",
    notice: "Notice",
    publish: "Publish",
    unpublish: "Unpublish",
    accept: "Accept",
    checkbox: {
      check_all: "Check All"
    },
    text_field: {
      remaining: "%(count)s remaining",
    },
    message: {
      created_success: "Created successfully",
      updated_success: "Updated successfully",
      deleted_success: "Deleted successfully",
      connection_error: "You have some problems with connection.",
      no_record: "Have no record!",
      request_login: "Session is expired, press OK to  reload!",
      no_authorization: "You are not authorized to access this page.",
      confirmation: {
        title: "Confirmation",
        update: "To save the contents of the above. Is it OK?",
        delete: "You delete the contents of the above. Is it OK?",
        delete_search_item: "You delete the contents of the above. Is it OK?",
      },
    },
    attributes: {
      created_at: "Created at",
      updated_at: "Updated at",
      creator_id: "Registor",
      updater_id: "Updater",
      id: "ID",
    },
  },
  login: {
    login_id: "Login ID",
    password: "Password",
    remember: "Remember",
    btn_login: "Login",
    invalid: "Login Id or password is invalid",
    not_login: "Session expired",
  },
  app: {
    drawer: {
      faqs: "FAQ",
      master: "Master",
      top: "TOP",
      communities: "Community",
      notifications: "Notification",
      company: "Company settings",
      pmsSetting: "PMS Settings",
      masterNavigation: "Master Navigation",
      myPage: "My Page",
      navigations: "Navigation",
      manual_files: "ManualFile",
      bookmarks: "Bookmark",
    },
    user_drawer: {
      change_password: "Change password",
      sign_out: "Sign out",
      user_info: "User Informations",
      change_password_form: {
        current_password: "Current password",
        password: "New password",
        password_confirmation: "Password confirmation ",
      },
    },
    change_field_drawer: {
      change_field: "Change field",
      admin_page: "Admin page",
    },
    favorite_drawer: {
      favorite: "Favorite",
      faq: "FAQ",
      community: "Community",
      show_more: "Show more",
    },
    search_drawer: {
      title: "Search",
      show_more: "Show more",
      troubles: "Troubles",
      faq: "FAQ",
      community: "Community",
      notification: "Notification",
    },
    master: {
      clients: "Master Clients",
      positions: "Master Positions",
    }
  },
  master: {
    confirm_edit: "To save the contents of the above. Is it OK?",
    confirm_create: "You create the contents of the above. Is it OK?",
    confirm_delete: "You delete the contents of the above. Is it OK?",
    sort: "Sort",
    index: {
      clients: "Client",
      positions: "Position",
      notificationAddresses: "Notification",
      troubles: "Trouble",
      tags: "Tag",
      navigations: "Navigation",
      users: "User",
      organizations: "Organization",
    },
    clients: {
      header_title: "Master Clients",
      title: "Client",
      child: "Lines",
      attributes: {
        short_name: "Short Name",
        name: "Name",
        name_kana: "Name Kana",
        phone_number: "Phone Number",
        address: "Address",
        notes: "Notes",
        code: "Client Code",
      },
      messages: {
        confirm_edit: "To save the contents of the above. Is it OK?",
        confirm_create: "You create the contents of the above. Is it OK?",
      },
      index: {
        line: "Line",
      },
    },
    lines: {
      title: "Lines",
      attributes: {
        name: "Name",
        name_kana: "Name Kana",
        free_dial_number: "Free dial number",
        client_code: "Client Code",
        notes: "Notes",
        client_name: "Client name",
        code: "Line Code",
      },
      index: {
        search: "Search",
      },
      form: {
        edit: "Edit Line",
        create: "Create Line",
        troubles: "Troubles",
      },
    },
    positions: {
      header_title: "Master Positions",
      title: "Position",
      attributes: {
        notes: "Notes",
        name: "Name",
        position_code: "Position Code",
      },
    },
    notifications: {
      header_title: "Notification Address",
      title: "Notification",
      type: {
        title: "Notification Type",
        help: "Help",
        notification: "Notification",
      },
      attributes: {
        notification_type: "Notification Type",
        user: "User Management",
        teams: "Team Management",
      },
    },
    troubles: {
      title: "Trouble",
      attributes: {
        tiny_trouble: "Tiny Trouble",
        small_trouble: "Small Trouble",
        medium_trouble: "Medium Trouble",
        big_trouble: "Big Trouble",
        name: "Name",
        code: "Trouble Code",
      },
      name: "Name",
      list: "Category",
    },
    trouble_names: {
      header_title: "Trouble Name",
      title: "Trouble Name",
      attributes: {
        key: "Trouble Content",
        name: "Name",
      },
      trouble_keys: {
        big_trouble: "Big Trouble",
        medium_trouble: "Medium Trouble",
        small_trouble: "Small Trouble",
        tiny_trouble: "Tiny Trouble",
      },
    },
    navigations: {
      title: "Navigation",
    },
    users: {
      header_title: "Master Users",
      title: "Users",
      attributes: {
        login_id: "Login ID",
        name: "Name",
        name_kana: "Name Kana",
        password: "Password",
        company: "Company",
        position: "Position",
        organization: "Organization",
        department: "Department",
        team: "Team",
        client_lines: "Client/Lines",
        phone_number: "Phone number",
        internal_number: "Internal number",
        email: "Email",
        role: "Role",
        notes: "Notes",
      },
      roles: {
        member: "Member",
        manager: "Manager",
        admin: "Admin",
        pms_admin: "PMS Admin",
      },
    },
    organizations: {
      header_title: "Master Organizations",
      title: "Organizations",
      child: "Departments",
      attributes: {
        name: "Name",
        notes: "Notes",
      },
    },
    departments: {
      title: "Departments",
      child: "Teams",
      attributes: {
        name: "Name",
        notes: "Notes",
      },
      organization_name: "Organization name",
    },
    teams: {
      title: "Teams",
      attributes: {
        name: "Name",
        notes: "Notes",
      },
      organization_name: "Organization name",
      department_name: "Department name",
    },
    small_tags: {
      title: "Tag (small)",
      attributes: {
        name: "Tag (small)",
        notes: "Notes",
      }
    },
    big_tags: {
      header_title: "Master Tags",
      title: "Tag (big)",
      child: "Tags (small)",
      attributes: {
        name: "Tag (big)",
        notes: "Notes",
        order: "Order",
      },
    },
  },
  faquestions: {
    title: "FAQ",
    attributes: {
      title: "Title",
      priority: "Priority",
      severity: "Severity",
      question: "Question",
      answer: "Answer",
      team: "Notification Address",
      file: "File",
      troubles: "Troubles",
      tags: "Tags",
    },
    index: {
      no_id: "No.",
      moved: "moved",
      search_results: "Search Results: %(count)s item(s)",
      faq_list: "New FAQ List",
      favorite: "Favorite",
      order: {
        faquestion_users: {
          favorited_at: "Favorite time",
        },
        community_users: {
          favorited_at: "Favorite time",
        },
        created_at: "New",
        views: "Views",
        helpfuls: "Helpfuls",
        community_helpfuls: "Usefuls",
        priority: "Priority",
        severity: "Severity",
        comment_count: "Comments",
      },
    },
    detail: {
      file: "File",
      related_FAQs: "Related FAQ",
      related_Coms: "Related Communities",
      moved_from: " moved from",
      not_found: "FAQ not found!",
    },
    form: {
      placeholder: {
        title: "Please enter title!",
        question: "Please enter question!",
        answer: "Please enter answer!",
      },
      create_new: "Create new FAQ",
      move_to_faq: "Move to FAQ",
    },
    priorities: {
      low: "Low",
      medium: "Medium",
      high: "High"
    },
    client_lines: {
      placeholder: {
        short_name: "Input a short name"
      },
      client_line: "Client/Lines",
      short_name: "Short name",
      client: "Client",
      line: "Line",
    },
    troubles:{
      title: "Troubles",
      tiny_trouble: "Tiny Trouble",
      small_trouble: "Small Trouble",
      medium_trouble: "Medium Trouble",
      big_trouble: "Big Trouble",
    },
    tags: {
      tags: "Tags",
      big: "Tag (big)",
      small: "Tag (small)",
    },
  },
  notifications: {
    title: "Notification",
    attributes: {
      title: "Title",
      content: "Content",
      priority: "Priority",
      team: "Notification Address",
      period: "Period",
      start_date: "Start Date",
      end_date: "End Date",
      file: "File",
    },
    priorities: {
      low: "Low",
      medium: "Medium",
      high: "High"
    },
    index: {
      notification_list: "Notification List",
      search_results: 'Search Results: %(count)s item(s)',
      order: {
        created_at: "New",
        priority: "Priority",
        comment_count: "Comments",
      },
      search: {
        period: "Period",
        no_period: "No Period",
        set_period: "Set Period",
      },
      has_note: "Has note",
    },
    form: {
      create_new: "Create new",
      client_line: "Client/Lines",
      tags: "Tags",
      placeholder: {
        title: "Title",
        content: "Content",
      },
      text_after: {
        to: "To",
        from: "From",
      },
    },
    detail: {
      add_note: "Add note",
      readed: "Readed",
      readed_user_list: "Readed user list",
      confirm_readed_message: "You readed this notification ?",
    },
  },
  communities: {
    title: "Community",
    show: {
      total_comment: "Total comments"
    },
    index: {
      com_id: "Community_no",
      moved_at: "moved_at",
      com_list: "New community list",
      comment: "Comments",
    },
    form: {
      create_new: "Create new community"
    },
    messages: {
      is_moved: "This Community is moved by someone",
    },
  },
  comments: {
    attributes: {
      content: "Content",
    },
    button: {
      post: "Post",
      new_comment: "New CMT",
      go_to_faq: "Go To FAQ",
      faq: "FAQ",
    },
    form: {
      placeholder: "Please enter content here!",
      content: "Content",
      upload_file: "Upload File",
    },
  },
  attachment: {
    btn_choose_file: "Choose a file",
    btn_uploading: "Uploading...",
    attachment_file_size: "File size",
    attachment_content_type: "File type",
    attachment_file_name: "File name",
    invalid: "File is invalid",
    messages: {
      file_type: "File type is invalid",
      file_size: "File size must be less than %(size)s MB",
    },
  },
  top: {
    title: "TOP",
    header_list_faq: "Newest FAQs",
    header_list_com: "Newest Communities",
    feed: {
      title: "Feed",
      nikkeibp: "Nikkeibp",
      report: "Report",
    },
    notification: {
      view_all: "View all Notifications",
      filter: {
        my_team: "My Team",
        other_team: "Other Teams",
      },
    }
  },
  company: {
    index: {
      users: "Users",
      organizations: "Organization",
      positions: "Position",
      fields: "Field",
    },
    fields: {
      header_title: "Field",
      title: "Field",
      organization: "Organization",
      department: "Department",
      team: "Team",
      notice: "This team has added in field or other field",
      attributes: {
        id: "ID",
        name: "Field name",
        team_num: "Num of Team",
        user_num: "Number of User",
        contract_period: "Contract Period",
        field: "Field name",
        is_valid: "Is Active",
      }
    },
  },
  navigations: {
    header_title: "Navigation master",
    title: "Navigations",
    warning: "Please select line before search",
    empty_todos: "Flow doesn't have any todo",
    no_active_step: "Need at least one active step",
    master: {
      stepConfig: "Step config",
      navigations: "Navigation",
      flows: "Flow",
      claims: "Claim",
      title_guide: "This is step config, please enter name of step!",
      off: "OFF",
      step: "Step",
      direct_text: "Please select branch and proceed with creation.",
      form: {
        title: "Create Navigation",
        button: {
          create_todo: "Create To do",
          import_flow_path: "Import Flow Path",
          next_step: "Next Step",
          claim: "Claim",
          help: "HELP!!",
        },
      },
      index: {
        view_navigation: "View Navi",
        publish_time: "Publish time",
      },
      help_notification: "Help notification",
    },
    attributes: {
      client_id: "Client",
      line_id: "Line",
      client_short_name: "Client",
      client_line: "Client > Line",
      status: "Status",
      steps: "Step",
    },
    publish_dialog: {
      title: "Publish title",
      header_title: "Current config: Private",
      publish_now: "Publish now",
      publish_in_specific_day: "Publish in specific day",
      time: "Time",
    },
    buttons: {
      temp_save: "Save temporarily",
    },
  },
  todos: {
    form: {
      todo_type: "TODO Type",
      add_node: "Add node",
      button: {
        only_text: "Text",
        branch: "Flow",
      },
      placeholder: {
        title: "Please enter title!",
        content: "Please enter content!",
        name: "Please enter name",
      },
    },
    attributes: {
      title: "Title",
      content: "Content",
      name: "Name",
      node: "Node",
      nodes: {
        name: "Node name",
      },
    }
  },
  claims: {
    form: {
      create: "Create",
      placeholder: {
        title: "Please enter title!",
        content: "Please enter content!",
      },
    },
    attributes: {
      title: "Title",
      content: "Content",
    }
  },
  helps: {
    notice_help: "HELP! It is! I will send you a notice.",
    notice_to_manager: "It is OK? Notification destination: manager.",
    notice_confirm: "HELP! It is! A notification has been sent",
  },
  flows: {
    title: "Create flow",
    form: {
      placeholder: {
        name: "Name of flow",
        step: "Step",
      },
    },
    attributes: {
      name: "Name",
      step: "Step",
    },
    config: "Config",
    todos: "Todos",
    single: "Single",
    complex: "Complex",
    index: {
      no_id: "No.",
      flow_list: "New Flow List",
      search_results: "Search results: %(count)s item(s)",
    },
    detail: {
      title_dialog: "Add Flow",
    },
    message: {
      confirmation: "Do you want to save the attribute setting?"
    },
  },
  pms: {
    index: {
      company: "Company",
      field: "Field",
      users: "User",
    },
    companies: {
      header_title: "PMS Settings",
      title: "Company",
      child: "Field",
      attributes: {
        field_num: "Number of Field",
        user_num: "Number of User",
        name: "Name",
        name_kana: "Name Kana",
        postal_code: "Postal code",
        address: "Address",
        phone_number: "Phone number",
        fax: "FAX",
        billing_address_zip: "Billing address zip(postal) code",
        billing_address: "Billing address",
        phone_number_billing: "Phone number of Billing address",
        fax_billing: "FAX of Billing address",
        name_PIC: "Full name PIC",
        name_kana_PIC: "Full name PIC (kana)",
        name_PIC_billing: "Name PIC of Billing",
        name_kana_PIC_billing: "Name (kana) PIC of Billing",
        notes: "Notes",
      },
    },
    fields: {
      header_title: "Field",
      title: "Field",
      period: "Period",
      to: "To",
      from: "From",
      pink: "Witty",
      green: "Green",
      blue: "blue",
      attributes: {
        style: "Style",
        contract_period: "Contract Period",
        name: "Name",
        user_num: "Number of User",
        team_num: "Number of Team",
      }
    },
    attachment: {
      big_logo: "Big logo",
      small_logo: "Small logo",
      note_big: "130x43",
      note_small: "60x40",
    },
    rss_sources: {
      rss: "RSS",
      note: "maximum 2 url",
      add_new: "New Rss Source",
      attributes: {
        title: "Title",
        url: "URL",
      },
    },
  },
  my_page: {
    title: "My Page",
    faquestion_history: "FAQ Contribution History",
    community_history: "Community Contribution History",
    help_history: "HELP!! notification",
    go_to_history_list: "Go to history list",
    community: "[Community] ",
    comment: "[Comment] ",
    help: {
      title: "need HELP!!!",
      time_notice: "Notification receipt date: ",
      time_done: "Notification done date: ",
    },
    contribution: {
      title: "Community Contribution",
      community_created: "Community created",
      comment_created: "Comment",
      like: {
        title: "Helpful",
        be_liked: "Be liked",
        liked: "Liked",
      },
      favorite: "Favorite",
      in_month: "In month",
      total: "Total",
    },
  },
  manual_files: {
    title: "Manual field file",
    file_name: "File name",
    button: {
      create_folder: "Create Folder",
      download: "Download",
      copy: "Copy",
      no_chose_file: "No file chose",
      copied: "Copied",
    }
  },
  folder: {
    attributes: {
      name: "Name",
      attachment_file_name: "Name",
      file_name: "Name",
    },
    form: {
      placeholder: {
        name: "Name",
        attachment_file_name: "Name",
        file_name: "Name",
      },
    }
  },
  bookmarks: {
    title: "Bookmarks",
    attributes: {
      name: "Name",
      url: "URL",
      description: "Description",
    },
    button: {
      create_folder: "Create folder",
      create_bookmark: "New bookmark"
    },
    form: {
      placeholder: {
        name: "Name",
        url: "URL",
        description: "Description",
      },
    },
  },
}
