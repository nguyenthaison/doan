class HelpChannel < ApplicationCable::Channel
  def subscribed
    $redis.set("#{current_user.id}", "#{current_user.id}")
    stream_from "#{current_user.id}_channel_#{Rails.env}"
  end

  def unsubscribed
    $redis.del("#{current_user.id}")
  end
end
