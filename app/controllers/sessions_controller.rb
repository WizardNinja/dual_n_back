class SessionsController < ApplicationController
	def new
	end

	def create
		user = User.find_by_email(params[:email])
		if user && user.authenticate(params[:password])
			sign_in(user)
			redirect_to root_path
		else
			redirect_to scores_path
		end
	end

	def destroy
		sign_out()
		redirect_to root_path
	end
end
