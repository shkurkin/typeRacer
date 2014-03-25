$(function(){
  GameRoom.init();
})

var GameRoom = (function(){
  function bindEvents() {
    APP.socket.on('updateClients', updateClientList)
  }

  function updateClientList(data) {
    $('#currentUsers').html(data.join(" "))
  }

  function _init() {
    bindEvents();
  }

  return {
    init: _init
  }
}());
