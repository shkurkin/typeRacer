$(function() {
  UserFunctions.init();
  APP.socket.on('makeUser', UserFunctions.make);
  APP.socket.on('updateTracks', UserFunctions.updateTracks);
  APP.socket.on('updateName', UserFunctions.updateName)
});

var UserFunctions = (function(){
  function bindEvents() {
    $('#setUserName input').on('focus', unbindKeys);

    $('#setUserName').on('focusout', WatchTyping.init);

    $('#setUserName').on('submit', setName)
  }

  function unbindKeys() {
    $('html').unbind('keydown');
  }

  function setName(event) {
    event.preventDefault();
    var name = $(event.target).find('input').val();
    $('.current-username').html(name);
    APP.socket.emit('setName', {
      userId: APP.user,
      userName: name
    })
  }

  function _updateName(data) {
    $("." + data.userId).html(data.userName)
  }

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

  function _init() {
    bindEvents();
  }

  return {
    init: _init,
    make: _make,
    updateTracks: _updateTracks,
    updateName: _updateName
  }
}());