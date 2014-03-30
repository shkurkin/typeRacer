$(function() {
  APP.socket.on('makeUser', UserFunctions.make);
  APP.socket.on('updateTracks', UserFunctions.updateTracks);
});

var UserFunctions = (function(){
  function _make(data) {
    APP.user = APP.user || data;
  }

  function _updateTracks(data) {
    var $usernames = $('.username');
    $.each($usernames, function(i, username) {
      var include = $.inArray($(username).html(), data)
      if( include == -1 && $(username).html()) {
        $(username).parent().remove()
      }
    });
  }

  return {
    make: _make,
    updateTracks: _updateTracks
  }
}());