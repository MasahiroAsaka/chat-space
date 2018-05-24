class UsersController < ApplicationController

  def index
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%")
    respond_to do |format|
     format.html
     render json: @users
   end
  end

  def new

  end

  def sign_up
    if User.creat(user_params)
    redirect_to user_session_pass, notice: "アカウントが登録されました。"
    else
      render :new
    end
  end

  def sign_in
    redirect_to user_session_pass, notice: "ログインしました。"
  end

  def sign_out
    redirect_to root_path, notice: "ログアウトしました。"
  end

  def edit

  end

  def update
    if current_user.update()
      redirect_to root_path
    else
      render :edit
    end
  end

 private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
