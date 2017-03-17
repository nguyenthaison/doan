export default {
  common: {
    create: "新規作成",
    save: "保存",
    delete: "削除",
    edit: "編集",
    detail: "詳細",
    cancel: "キャンセル",
    copy: "コピー",
    sign_out: "ログアウト",
    add: "追加",
    submit: "確認",
    close: "閉じる",
    update: "更新",
    back: "戻る",
    ok: "OK",
    add: "追加",
    required: "必須",
    search: "検索",
    confirmation: "確認",
    done: "完了",
    show_more: "もっと見る",
    no_deadline: "期間なし",
    notice: "お知らせ",
    publish: "公開",
    unpublish: "非公開",
    accept: "はい",
    checkbox: {
      check_all: "すべてを選択"
    },
    text_field: {
      remaining: "あと%(count)s文字",
    },
    message: {
      created_success: "作成しました。",
      updated_success: "更新しました。",
      deleted_success: "削除しました。",
      connection_error: "ネットワークエラーが発生しました。もう一度お試しください。",
      no_record: "該当データはありません。",
      request_login: "セッションの有効期限が切れています。「OK」ボタンを押下してください。",
      no_authorization: "ページにアクセス権がありません。システム管理者に連絡してください。",
      confirmation: {
        title: "確認",
        update: "作成内容を保存しますか？",
        delete: "削除してよろしいですか？",
        delete_search_item: "設定条件を削除してよろしいですか？"
      },
    },
    attributes: {
      created_at: "登録日時",
      updated_at: "更新日時",
      creator_id: "登録者",
      updater_id: "更新者",
      id: "ID",
    },
  },
  login: {
    login_id: "ログインID",
    password: "パスワード",
    remember: "ログイン状態を保持する",
    btn_login: "ログイン",
    invalid: "ID、パスワードを忘れた方は、管理者にお問い合わせください。",
    not_login: "セクションの有効期限が切れてしまいました。",
  },
  app: {
    drawer: {
      faquestions: "FAQ",
      master: "マスタ管理",
      top: "TOP",
      communities: "コミュニティ",
      notifications: "お知らせ",
      pmsSetting: "PMS管理",
      company: "会社管理",
      masterNavigation: "ナビゲーションマスタ",
      myPage: "マイページ",
      navigations: "ナビゲーション",
      manual_files: "資料集",
      bookmarks: "参考サイト",
    },
    user_drawer: {
      change_password: "パスワード変更",
      sign_out: "ログアウト",
      user_info: "ユーザー情報",
      change_password_form: {
        current_password: "現在のパスワード",
        password: "新しいパスワード",
        password_confirmation: "確認パスワード",
      },
    },
    change_field_drawer: {
      change_field: "領域メニュー切り替え",
      admin_page: "会社メニューに戻る",
    },
    favorite_drawer: {
      favorite: "お気に入り",
      faq: "FAQ",
      community: "コミュニティ",
      show_more: "もっと見る",
    },
    search_drawer: {
      title: "検索",
      show_more: "もっと見る",
      troubles: "トラブル",
      faq: "FAQ",
      community: "コミュニティ",
      notification: "お知らせ",
    },
    master: {
      clients: "クライアントマスタ",
      positions: "役職マスタ",
    }
  },
  master: {
    confirm_edit: "上記の内容で保存します。よろしいですか？",
    confirm_create: "上記の内容で作成します。よろしいですか？",
    confirm_delete: "削除してよろしいですか？",
    sort: "並び替え",
    index: {
      clients: "クライアント",
      positions: "役職",
      notificationAddresses: "通知先",
      troubles: "トラブル",
      tags: "タグ",
      navigations: "ナビゲーション",
      users: "ユーザー",
      organizations: "組織",
    },
    clients: {
      header_title: "クライアントマスタ",
      title: "クライアント",
      child: "ライン",
      attributes: {
        short_name: "略称",
        name: "クライアント名",
        name_kana: "クライアント名（カナ）",
        phone_number: "電話番号",
        address: "住所",
        notes: "備考",
        code: "クライアントコード",
      },
      messages: {
        confirm_edit: "上記の内容で保存します。よろしいですか？",
        confirm_create: "上記の内容で作成します。よろしいですか？",
      },
      index: {
        line: "ライン",
      },
    },
    lines: {
      title: "ライン",
      attributes: {
        name: "ライン名",
        name_kana: "ライン名（カナ）",
        free_dial_number: "フリーダイヤル番号",
        client_code: "クライアントコード",
        notes: "備考",
        client_name: "クライアント名",
        code: "ラインコード",
      },
      index: {
        search: "検索",
      },
      form: {
        edit: "編集",
        create: "新規作成",
        troubles: "トラブル",
      },
    },
    positions: {
      header_title: "役職マスタ",
      title: "役職",
      attributes: {
        notes: "備考",
        name: "役職名",
        position_code: "役職コード",
      },
    },
    notifications: {
      header_title: "マスタ管理",
      title: "通知先",
      type: {
        title: "通知種別",
        help: "ナビHELP",
        notification: "お知らせ未読",
      },
      attributes: {
        notification_type: "通知種別",
        user: "通知管理者",
        teams: "管理対象チーム",
      }
    },
    troubles: {
      title: "トラブル",
      attributes: {
        tiny_trouble: "トラブル（最小）",
        small_trouble: "トラブル（小）",
        medium_trouble: "トラブル（中）",
        big_trouble: "トラブル（大）",
        name: "トラブル 名",
        code: "トラブル ID",
      },
      name: "表示名",
      list: "トラブル内容",
    },
    trouble_names: {
      header_title: "トラブル",
      title: "トラブル",
      attributes: {
        key: "トラブル内容",
        name: "トラブル 名",
      },
      trouble_keys: {
        big_trouble: "トラブル（大）",
        medium_trouble: "トラブル（中）",
        small_trouble: "トラブル（小）",
        tiny_trouble: "トラブル（最小）",
      },
    },
    small_tags: {
      title: "タグ（小）名",
      attributes: {
        name: "タグ（小）名",
        notes: "備考",
      }
    },
    big_tags: {
      header_title: "タグマスタ",
      title: "タグ（大）名",
      child: "タグ（小）名",
      attributes: {
        name: "タグ（大）名",
        notes: "備考",
        order: "順序",
      },
    },
    navigations: {
      title: "ナビゲーション",
    },
    users: {
      header_title: "ユーザーマスタ",
      title: "ユーザー",
      attributes: {
        login_id: "ログインID",
        name: "氏名",
        name_kana: "氏名（カナ）",
        password: "パスワード",
        company: "会社名",
        position: "役職名",
        organization: "組織名",
        department: "部署名",
        team: "チーム名",
        client_lines: "クライアント/ライン名",
        phone_number: "電話番号",
        internal_number: "内線",
        email: "メールアドレス",
        role: "権限",
        notes: "備考",
      },
      roles: {
        member: "一般",
        manager: "管理者",
        admin: "システム管理者",
        pms_admin: "PMS管理",
      },
    },
    organizations: {
      header_title: "組織マスタ",
      title: "組織",
      child: "部署",
      attributes: {
        name: "組織名",
        notes: "備考",
      },
    },
    departments: {
      title: "部署",
      child: "チーム",
      attributes: {
        name: "部署名",
        notes: "備考",
      },
      organization_name: "組織名",
    },
    teams: {
      title: "チーム",
      attributes: {
        name: "チーム名",
        notes: "備考",
      },
      organization_name: "組織名",
      department_name: "部署名",
    },
  },
  faquestions: {
    title: "FAQ",
    attributes: {
      title: "タイトル",
      priority: "重要度",
      severity: "緊急度",
      question: "質問",
      answer: "回答",
      team: "通知先",
      file: "ファイル",
      troubles: "トラブル",
      tags: "タグ",
    },
    index: {
      no_id: "No.",
      moved: "より移行",
      search_results: "検索結果: %(count)s 件",
      faq_list: "FAQ一覧",
      favorite: "お気に入り",
      order: {
        faquestion_users: {
          favorited_at: "お気に入り登録日付",
        },
        community_users: {
          favorited_at: "お気に入り登録日付",
        },
        created_at: "新着順",
        views: "閲覧順",
        helpfuls: "役立ったね数順",
        community_helpfuls: "役立ったね順",
        priority: "重要度順",
        severity: "緊急度順",
        comment_count: "コメント数",
      },
    },
    detail: {
      file: "ファイル",
      related_FAQs: "関連するFAQ",
      related_Coms: "関連するコミュニティ",
      moved_from: " より移行",
      not_found: "FAQは存在していません。!",
    },
    form: {
      placeholder: {
        title: "タイトルを入力してください。",
        question: "質問を入力してください。",
        answer: "回答を入力してください。",
      },
      create_new: "新規作成",
      move_to_faq: "FAQへ移行",
    },
    priorities: {
      low: "低",
      medium: "中",
      high: "高"
    },
    client_lines: {
      placeholder: {
        short_name: "クライアント略称を入力してください。"
      },
      client_line: "クライアント/ライン名",
      short_name: "略称",
      client: "クライアント",
      line: "ライン",
    },
    troubles:{
      title: "トラブルカテゴリ",
      tiny_trouble: "トラブル（最小）",
      small_trouble: "トラブル（小）",
      medium_trouble: "トラブル（中）",
      big_trouble: "トラブル（大）",
    },
    tags: {
      tags: "用途タグ",
      big: "タグ（大）",
      small: "タグ（小）",
    },
  },
  notifications: {
    title: "お知らせ",
    attributes: {
      title: "タイトル",
      content: "内容",
      priority: "重要度",
      team: "通知先",
      period: "掲示期間",
      start_date: "期間",
      end_date: "期間",
      file: "ファイル",
    },
    priorities: {
      low: "低",
      medium: "中",
      high: "高",
    },
    index: {
      notification_list: "お知らせ一覧",
      search_results: "検索結果: %(count)s 件",
      order: {
        created_at: "新着順",
        priority: "重要度",
        comment_count: "コメント数",
      },
      search: {
        period: "掲示期間絞込み",
        no_period: "期間設定なし",
        set_period: "掲示期間を絞込む",
      },
      has_note: "追記あり",
    },
    form: {
      create_new: "新規作成",
      client_line: "クライアント/ライン名",
      tags: "タグ",
      placeholder: {
        title: "タイトルを入力してください。",
        content: "お知らせ内容を入力して下さい。",
      },
      text_after: {
        to: "まで",
        from: "から",
      },
    },
    detail: {
      add_note: "追記",
      readed: "読了",
      readed_user_list: "既読者一覧",
      confirm_readed_message: "この記事を既読にします。よろしいですか？",
    },
  },
  communities: {
    title: "コミュニティ",
    show: {
      total_comment: "コメント数"
    },
    index: {
      com_id: "へ移行",
      moved_at: "移行日時",
      com_list: "コミュニティ一覧",
      comment: "コメント数",
    },
    form: {
      create_new: "新規作成"
    },
    messages: {
      is_moved: "もうFAQへ移動しました。",
    },
  },
  comments: {
    attributes: {
      content: "コメント",
    },
    button: {
      post: "確定",
      new_comment: "コメントする",
      go_to_faq: "FAQを見る",
      faq: "FAQ",
    },
    form: {
      placeholder: "コメントを入力してください。",
      content: "コメント内容",
      upload_file: "アップロード",
    },
  },
  attachment: {
    btn_choose_file: "ファイルを選択",
    btn_uploading: "アップロード中・・・",
    attachment_file_size: "ファイルサイズ",
    attachment_content_type: "ファイルタイプ",
    attachment_file_name: "名称",
    invalid: "正しいファイル形式ではありません",
    messages: {
      file_type: "正しいファイル形式ではありません",
      file_size: "%(size)s MB以下ファイルを選択してください。",
    },
  },
  top: {
    title: "TOP",
    header_list_faq: "新着FAQ",
    header_list_com: "新着コミュニティ",
    feed: {
      title: "最新ニュース",
      nikkeibp: "日経アーキテクチュア",
      report: "不動産流通研究所",
    },
    notification: {
      view_all: "お知らせ一覧へ",
      filter: {
        my_team: "チームお知らせ",
        other_team: "その他お知らせ",
      },
    }
  },
  company: {
    index: {
      users: "ユーザー",
      organizations: "組織",
      positions: "役職マスタ",
      fields: "利用領域",
    },
    fields: {
      header_title: "会社領域管理",
      title: "利用領域",
      organization: "組織",
      department: "部署",
      team: "チーム",
      notice: "そのチームは他の領域に追加されています",
      attributes: {
        id: "領域ID",
        name: "領域名",
        team_num: "利用チーム",
        user_num: "利用人数",
        contract_period: "契約期間",
        field: "領域名",
        is_valid: "Is Active",
      }
    },
  },
  navigations: {
    title: "ナビゲーション",
    header_title: "ナビゲーションマスタ",
    warning: "ラインまで選択してください",
    empty_todos: "そのフローパーツにはTO DOがありません。他のフローパーツを選択してください。",
    no_active_step: "ナビを作成できるため、一つ活性のステップが必要です。",
    master: {
      stepConfig: "ステップ設定",
      navigations: "ナビゲーション",
      flows: "フローパーツ",
      claims: "クレーム対応",
      title_guide: "使用するSTEP数を選択し、STEP名を入力してください",
      off: "OFF",
      step: "ステップ",
      direct_text: "分岐を選んで、作成を進んでください。",
      form: {
        title: "コピーして新規作成",
        button: {
          create_todo: "TO DOを追加",
          import_flow_path: "フローパーツを追加",
          finish_step: "このステップを完了",
          claim: "クレーム対応",
          help: "HELP!!",
        },
      },
      index: {
        view_navigation: "ナビ閲覧",
        publish_time: "予約",
      },
      help_notification: "HELP!!通知",
    },
    attributes: {
      client_id: "クライアント",
      line_id: "ライン",
      client_short_name: "略称",
      client_line: "クライアント > ライン",
      status: "ステータス",
      steps: "ステップ",
    },
    publish_dialog: {
      title: "公開設定",
      header_title: "現在の公開設定：未公開",
      publish_now: "すぐ公開",
      publish_in_specific_day: "予約公開",
      time: "期間",
    },
    buttons: {
      temp_save: "一時保存",
    },
  },
  todos: {
    form: {
      todo_type: "TO DO タイプ",
      add_node: "追加",
      button: {
        only_text: "読み物",
        branch: "分岐",
      },
      placeholder: {
        title: "タイトルを入力してください。",
        content: "内容を入力してください。",
        name: "選択肢の内容を入力してください。",
      },
    },
    attributes: {
      title: "ファイル",
      content: "内容",
      name: "選択肢",
      node: "分岐",
      nodes: {
        name: "選択肢",
      },
    },
  },
  claims: {
    form: {
      create: "保存",
      placeholder: {
        title: "タイトルを入力してください。",
        content: "内容を入力してください。",
      },
    },
    attributes: {
      title: "ファイル",
      content: "内容",
    }
  },
  helps: {
    notice_help: "HELP!!通知を送ります。よろしいでしょうか？",
    notice_to_manager: "通知先：＜Manager＞",
    notice_confirm: "HELP!!通知を送信しました。",
  },
  flows: {
    title: "フローパーツ作成",
    form: {
      placeholder: {
        name: "フローパーツを入力してください",
        step: "ステップ",
      },
    },
    attributes: {
      name: "パーツ名称",
      step: "ステップ",
    },
    config: "属性設定",
    todos: "TO DO作成",
    single: "単一",
    complex: "複合",
    index: {
      no_id: "No.",
      flow_list: "フローパーツ一覧",
      search_results: "検索結果: %(count)s 件",
    },
    detail: {
      title_dialog: "フローパーツ追加",
    },
    message: {
      confirmation: "属性設定を保存しますか？"
    },
  },
  pms: {
    index: {
      company: "企業・契約",
      field: "利用領域",
      users: "ユーザー",
    },
    companies: {
      title: "企業・契約",
      header_title: "PMS管理",
      child: "利用領域",
      attributes: {
        field_num: "利用領域数",
        user_num: "利用人数",
        name: "会社名",
        name_kana: "会社名カナ",
        postal_code: "郵便番号",
        address: "住所",
        phone_number: "電話番号",
        fax: "FAX",
        billing_address_zip: "請求書送付先郵便番号",
        billing_address: "請求書送付先住所",
        phone_number_billing: "請求書送付先電話番号",
        fax_billing: "請求書送付先FAX",
        name_PIC: "担当者氏名",
        name_kana_PIC: "担当者氏名カナ",
        name_PIC_billing: "請求担当者氏名",
        name_kana_PIC_billing: "請求担当者氏名カナ",
        notes: "備考",
      },
    },
    fields: {
      header_title: "会社領域管理",
      title: "利用領域",
      period: "期間",
      to: "まで",
      from: "から",
      pink: "ピンク",
      green: "緑",
      blue: "青",
      attributes: {
        style: "パターン設定",
        contract_period: "契約期間",
        name: "領域名",
        user_num: "利用人数",
        team_num: "利用チーム",
      }
    },
    attachment: {
      big_logo: "ロゴアップロード",
      small_logo: "ロゴアップロード",
      note_big: "※ロゴのサイズが130x43pxにした方が良い",
      note_small: "※ロゴのサイズが60x40pxにした方が良い",
    },
    rss_sources: {
      rss: "RSS設定",
      note: "RSSは最大2つまで設定できます。",
      add_new: "RSSを追加",
      attributes: {
        title: "タイトル",
        url: "URL",
      },
    },
  },
  my_page: {
    title: "マイページ",
    faquestion_history: "FAQ投稿履歴",
    community_history: "コミュニティ投稿履歴",
    help_history: "HELP!!履歴",
    go_to_history_list: "履歴一覧へ",
    community: "[質問] ",
    comment: "[コメント] ",
    help: {
      title: "さんからのHELP!!",
      time_notice: "通知受領日時: ",
      time_done: "確認完了日時: ",
    },
    contribution: {
      community_created: "質問数",
      comment_created: "コメント数",
      like: {
        title: "コメント数",
        be_liked: "役に立ったね！された数",
        liked: "役に立ったね！した数",
      },
      favorite: "お気に入り登録数",
      in_month: "今月",
      total: "総計",
    },
  },
  manual_files: {
    title: "資料集",
    file_name: "名称",
    button: {
      create_folder: "フォルダ作成",
      download: "ダウンロード",
      copy: "リンクをコピー",
      no_chose_file: "何のファイルも選択されていません。",
      copied: "コピーされた",
    }
  },
  folder: {
    attributes: {
      name: "フォルダ名",
      attachment_file_name: "フォルダ名",
      file_name: "フォルダ名",
    },
    form: {
      placeholder: {
        name: "フォルダ名",
        attachment_file_name: "フォルダ名",
        file_name: "フォルダ名",
      },
    }
  },
  bookmarks: {
    title: "参考サイト",
    attributes: {
      name: "名称",
      url: "URL",
      description: "説明",
    },
    button: {
      create_folder: "フォルダ作成",
      create_bookmark: "新規登録",
    },
    form: {
      placeholder: {
        name: "名称",
        url: "URL",
        description: "説明",
      },
    },
  },
}
