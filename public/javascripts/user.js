$(function() {
  APP.socket.on('makeUser', function(data) {
    APP.user = APP.user || data
  });

  APP.socket.on('disconnected', function(data) {
    console.log(data);
    var $usernames = $('.username');
    $.each($usernames, function(i, username) {
      var include = $.inArray($(username).html(), data)
      if( include == -1 && $(username).html()) {
        $(username).parent().remove()
      }
    });
  });
});