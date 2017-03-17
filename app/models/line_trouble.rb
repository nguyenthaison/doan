class LineTrouble < ActiveRecord::Base
  belongs_to :line
  belongs_to :big_trouble, class_name: Trouble.name, foreign_key: "big_trouble_id"
  belongs_to :medium_trouble, class_name: Trouble.name, foreign_key: "medium_trouble_id"
  belongs_to :small_trouble, class_name: Trouble.name, foreign_key: "small_trouble_id"
  belongs_to :tiny_trouble, class_name: Trouble.name, foreign_key: "tiny_trouble_id"
end
