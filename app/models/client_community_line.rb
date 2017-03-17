class ClientCommunityLine < ActiveRecord::Base
  belongs_to :client
  belongs_to :line
  belongs_to :community
end
