$(function(){

  function buildHTML(message){
    var image = message.image
    if (image) {
      insertImage = `<img class="lower-message__image" src="${image}">`;
    }else{
      insertImage = '';
    }
    var html = `
      <div class="message" data-message-id="${message.id}">
        <p class="upper-message__user-name">${message.name}</p>
        <p class="upper-message__date">${message.created_at}</p>
        <p class="lower-message__content">${message.text}</p>
        ${insertImage}
      </div>`;
    return html
    }

  $('#the-form').on('submit', function(event){
    event.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.group-message').append(html)
      $("#the-form")[0].reset()
      $(".form__submit").prop("disabled", false)
      $('.group-message').animate({scrollTop: $('.group-message')[0].scrollHeight}, 'fast')
    })
    .fail(function(){
      alert('error');
      $(".form__submit").prop("disabled", false);
    });
  });

    var interval = setInterval(function() {
    if (location.pathname.match(/\/groups\/\d+\/messages/)) {
      var messageId = ($('.message').data()) ? messageId = $('.message:last').data('message-id'): messageId = 0
      $.ajax({
        url: location.href,
        type: 'GET',
        data: {message: {id: messageId}},
        dataType: 'json',
      })
      .done(function(json){
        var insertHTML = '';
        json.messages.forEach(function(message){
          if (message.id > messageId){
          insertHTML += buildHTML(message);
        }
        });
        $('.group-message').append(insertHTML);
        $('.group-message').animate({ scrollTop: $('.group-message').get(0).scrollHeight },'fast');
      })
      .fail(function(data){
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(interval);
    };
  } , 2000 );

});
