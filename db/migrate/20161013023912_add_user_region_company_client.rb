class AddUserRegionCompanyClient < ActiveRecord::Migration
  def change
    add_reference :clients, :user_region, index: true, foreign_key: true
    add_reference :clients, :company, index: true, foreign_key: true
  end
end
