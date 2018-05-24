// $(function(){
//   function buildHTML(message){
//     var image = message.image
//     image == null ? (stop = true):($(".message").append('<img class="lower-message__image" src="${image}"" alt=""}>'));
//     var html =
//     `<div class="message">
//       <p class="upper-message__user-name">${message.name}</p>
//       <p class="upper-message__date">${message.created_at}</p>
//       <p class="lower-message__content">${message.text}</p>
//       <img class="lower-message__image" src="${image}" alt=""}>
//     </div>`
//     return html;
//   }
//   $('#the-form').on('submit', function(event){
//     event.preventDefault();
//     var formData = new FormData(this);
//     var url = $(this).attr('action');
//     $.ajax({
//       url: url,
//       type: "POST",
//       data: formData,
//       dataType: 'json',
//       processData: false,
//       contentType: false,
//     })
//     .done(function(data){
//       var html = buildHTML(data);
//       $('.group-message').append(html)
//       $("#the-form")[0].reset()
//       $(".form__submit").prop("disabled", false)
//       $('.group-message').animate({scrollTop: $('.group-message')[0].scrollHeight}, 'fast')
//     })
//     .fail(function(){
//       alert('error');
//       $(".form__submit").prop("disabled", false);
//     });
//   });
// });



$(function(){
  function buildHTML(message){
    var html_common =
    `<p class="upper-message__user-name">${message.name}</p>
    <p class="upper-message__date">${message.created_at}</p>
    <p class="lower-message__content">${message.text}</p>`
    var image = message.image
    if (image == null) {
      var html_without_image =
      `<div class="message">
      ${html_common}
      </div>`
    return html_without_image;
    }else{
      var html_with_image =
      `<div class="message">
      ${html_common}
      <img class="lower-message__imag" src=${message.image} alt="">
      </div>`
    return html_with_image;}
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
});
