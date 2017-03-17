class ClientFaquestionLine < ActiveRecord::Base
  belongs_to :client
  belongs_to :line
  belongs_to :faquestion
end
