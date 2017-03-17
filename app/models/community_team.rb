class CommunityTeam < ActiveRecord::Base
  belongs_to :team
  belongs_to :community
end
