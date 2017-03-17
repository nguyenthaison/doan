class RssSource < ActiveRecord::Base
  include SmartAsJson

  belongs_to :field

  has_many :feeds

  validates :title, presence: true
  validates_format_of :url, with: URI::regexp(%w(http https))

  after_save :get_feed
  after_destroy :delete_feed

  private
  def get_feed
    Feed.update_from_rss_source self
  end

  def delete_feed
    Feed.delete_all(["rss_source_id = ?", self.id])
  end

  class << self
    def search_by_query query
      RssSource.all
    end
  end
end
