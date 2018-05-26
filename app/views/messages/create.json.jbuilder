json.name @message.user.name
json.text       @message.text
json.image      @message.image.url
json.created_at @message.created_at.to_s(:default)
json.id         @message.id
