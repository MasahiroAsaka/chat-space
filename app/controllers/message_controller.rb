class MessageController < ApplicationController

  def new
    @message = Message.new(message_params)
  end

  def create
    if @message = Message.save(message_params)
      redirect_to root_path, notice: "メッセージを投稿しました。"
    else
      render :new
    end
  end

  def show
    @message = Message.find(set_message)
  end

 private
  def message_params
    params.require(:message).permit(:text, {:user_ids => []})
  end

  def set_message
    @message = Message.find(params[:id])
  end

end
