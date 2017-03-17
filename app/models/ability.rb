class Ability
  include CanCan::Ability

  def initialize user
    user ||= User.new

    case user.role
    when "pms_admin"
      can :manage, [User, Company, Field, RssSource]
    when "admin"
      can :manage, [Comment, NotificationNote, User, Faquestion, Community, Client,
        Trouble, TroubleName, Tag, Line, NotificationAddress, Notification, Setting,
        Organization, Department, Team, Position, Step, RssSource,
        Navigation, Field, Todo, Flow, Claim, Help, Folder, ManualFile, Bookmark,
        BookmarkFolder]
    when "manager"
      can :manage, [Comment, NotificationNote, User, Step, Navigation, Todo, Help, Folder, ManualFile,
        Bookmark, BookmarkFolder]
      can :manage, [Faquestion, Community, Client, Trouble, TroubleName, Tag,
        Line, NotificationAddress, Notification, Setting, RssSource, Flow, Claim],
        field_id: user.team.field_id
    when "member"
      can [:read, :update_helpful, :update_favorite, :update], [Community],
        field_id: user.team.field_id
      can [:read, :update_helpful, :update_favorite], [Faquestion],
        field_id: user.team.field_id
      can [:manage], [Community], creator_id: user.id, field_id: user.team.field_id
      can [:read, :create, :update, :destroy], Comment, creator_id: user.id
      can [:update_reaction], Comment
      can [:read, :create, :update_readed_user], Notification,
        field_id: user.team.field_id
      can [:update, :destroy], Notification, creator_id: user.id,
        field_id: user.team.field_id
      can [:add_note], Notification, field_id: user.team.field_id
      can [:read, :create], NotificationNote
      can [:update, :destroy], NotificationNote, creator_id: user.id
      can [:create, :update], Help
      can [:read], [Bookmark, BookmarkFolder, ManualFile, Folder], field_id: user.team.field_id
    end

    cannot [:update_reaction], Comment, creator_id: user.id
    cannot [:update], Comment do |comment|
      comment.creator_id != user.id
    end

    cannot [:update_helpful], Community do |community|
      community.creator_id == user.id
    end
    cannot [:update], Community do |community|
      community.creator_id != user.id || community.moved_to_faq
    end
    cannot [:destroy], Community do |community|
      community.moved_to_faq
    end

    can :index, :all
    can :update_password, User
  end
end
