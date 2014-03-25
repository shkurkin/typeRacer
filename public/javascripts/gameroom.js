$(function(){

})

var GameRoom = (function(){
  function bindEvents() {
    APP.socket.on('connect', updateUsers)
  }

  function updateUsers() {

  }

  function _init() {
    bindEvents();
  }

  return {
    init: _init
  }
}());
