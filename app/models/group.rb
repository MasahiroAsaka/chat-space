class Group < ApplicationRecord
  has_many :members
  has_many :messages
  has_many :users, through: :members
  validates :name, presence: true

  def show_last_message
    last_message = messages.last
    if last_message.present?
      if last_message.image.present? && last_message.text.present?
        last_message.text + ' 画像も投稿されています。'
      else
        last_message.text? ? last_message.text : '画像が投稿されています.'
      end
    else
      'まだメッセージはありません。'
    end
  end
end
