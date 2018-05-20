$(function(){
  function buildHTML(message){
  var html =
`
<div class="message">
<p class="upper-message__user-name">${message.name}</p>
<p class="upper-message__date">${message.created_at}</p>
<p class="lower-message__content">${message.text}</p>
<img class="image" src=${message.image.url} alt="">
</div>
`
    return html;
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
  })
});
