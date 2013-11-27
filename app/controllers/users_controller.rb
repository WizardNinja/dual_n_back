class UsersController < ApplicationController
	def new
	end

	def create
		user = User.create(params[:user])
		sign_in(user)
		redirect_to root_path
	end
end
