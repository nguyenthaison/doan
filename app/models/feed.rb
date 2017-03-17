class Feed < ActiveRecord::Base

  belongs_to :rss_source

  class << self
    def update_from_rss_source rss_source
      feed = Feedjira::Feed.fetch_and_parse rss_source.url
      add_entries feed.entries, rss_source
      delete_old_feed rss_source.id
    end

    private
    def add_entries entries, rss_source
      entries.each do |entry|
        unless exists? url: entry.url
          create(
            title: entry.title,
            url: entry.url,
            rss_source_id: rss_source.id,
            description: entry.summary,
          )
        end
      end
    end

    def delete_old_feed rss_source_id
      Feed.where("rss_source_id = ?", rss_source_id).order("id desc").offset(5).destroy_all
    end
  end
end
