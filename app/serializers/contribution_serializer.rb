class ContributionSerializer < ActiveModel::Serializer
  attributes :community_created, :comment_created, :like, :favorite

  def initialize user, options={}
    super
    @options = options
  end

  def community_created
    communities_created = Community.where creator_id: object.id
    {
      in_month: communities_created.where("created_at >= ? AND created_at <= ?",
        Date.today.beginning_of_month, Date.today.end_of_month).count,
      total: communities_created.count
    }
  end

  def comment_created
    comments_created = Comment.where creator: object, commentable_type: "Community"
    {
      in_month: comments_created.where("created_at >= ? AND created_at <= ?",
        Date.today.beginning_of_month, Date.today.end_of_month).count,
      total: comments_created.count
    }
  end

  def like
    comment_be_helpful =  CommentUser.joins(:comment)
      .where("comments.creator_id = ? AND vote is true", object.id)
    comment_helpful = CommentUser.where user_id: object.id, vote: true

    {
      be_liked: {
        in_month: comment_be_helpful.where("comment_users.created_at >= ?
          AND comment_users.created_at <= ?", Date.today.beginning_of_month,
          Date.today.end_of_month).count,
        total: comment_be_helpful.count
      },
      liked: {
        in_month: comment_helpful.where("created_at >= ? AND created_at <= ?",
          Date.today.beginning_of_month, Date.today.end_of_month).count,
        total: comment_helpful.count
      }
    }
  end

  def favorite
    community_favorite = CommunityUser.where user_id: object.id, favorite: true
    {
      in_month: community_favorite.where("created_at >= ? AND created_at <= ?",
        Date.today.beginning_of_month, Date.today.end_of_month).count,
      total: community_favorite.count
    }
  end
end
