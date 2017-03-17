$redis = Redis::Namespace.new ENV["REDIS_NAMESPACE"] || "faq",
  :redis => Redis.new(
    host: ENV["REDIS_HOST"],
    port: ENV["REDIS_PORT"],
    db: ENV["REDIS_DB"]
  )
