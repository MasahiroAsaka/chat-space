$(function() {

  var user_list = $("#user-search-result");

  function appendUser(user) {
    var html =
             `<div class="chat-group-user clearfix">
                <input name = 'group[user_ids][]' type='hidden'>
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" id = 'add-user-button' data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
    user_list.append(html);
  }

  function addMember(user){
    var add_member = $(".add_member");
    var user_name = user.data('user-name');
    var user_id = user.data('user-id');
    var html =
            `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
              <input name='group[user_ids][]' type='hidden' value="${user_id}">
              <p class='chat-group-user__name'>${user_name}</p>
              <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
            </div>`
      add_member.append(html);
    }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input},
      dataType:'json',
    })
    .done(function(users) {
      $("#user-search-result").empty();
     if (users.length !== 0) {
       users.forEach(function(user){
        appendUser(user);
       });
     }
     else {
       alert('一致するユーザーはいません。');
     }
   })
     .fail(function(users) {
      alert('Error');
    });
  });

  $("#user-search-result").on("click", "#add-user-button", function(){
    var user = $(this);
    $(this).parent().remove();
    addMember(user);
    });

  $(".chat-group-user").on("click", ".user-search-remove", function(){
    console.log("click!");
    $(this).parent().remove();
  });
});
