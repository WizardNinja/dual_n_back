class ScoresController < ApplicationController

	def index
		@user = current_user()
		scores1 = Score.where(level: 1)
		scores2 = Score.where(level: 2)
		scores3 = Score.where(level: 3)
		scores4 = Score.where(level: 4)
		scores1.sort! { |a, b| b.score <=> a.score }
		scores2.sort! { |a, b| b.score <=> a.score }
		scores3.sort! { |a, b| b.score <=> a.score }
		scores4.sort! { |a, b| b.score <=> a.score }
		@scores = scores4.concat(scores3.concat(scores2.concat(scores1)))
	end

	def create
		user = current_user()
		score = params[:score]
		level = params[:level]
		if user
			Score.create(score: score, level: level, user_id: user.id)
		end
		redirect_to root_path
	end

	def show
		@user = current_user()
		scores1 = Score.where(level: 1, user_id: @user.id)
		scores2 = Score.where(level: 2, user_id: @user.id)
		scores3 = Score.where(level: 3, user_id: @user.id)
		scores4 = Score.where(level: 4, user_id: @user.id)
		scores1.sort! { |a, b| b.score <=> a.score }
		scores2.sort! { |a, b| b.score <=> a.score }
		scores3.sort! { |a, b| b.score <=> a.score }
		scores4.sort! { |a, b| b.score <=> a.score }
		@scores = scores4.concat(scores3.concat(scores2.concat(scores1)))
	end

end
