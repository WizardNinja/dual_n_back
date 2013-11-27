class Score < ActiveRecord::Base
  attr_accessible :score, :user_id, :level
  belongs_to :user
end
