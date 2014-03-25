$(function(){
  GameRoom.init();
})

var GameRoom = (function(){
  function bindEvents() {
    APP.socket.on('updateClients', updateRoom)
  }

  function updateRoom(data) {
    updateClientList(data);
    updateBoards(data);
  }

  function updateClientList(data) {
    $('#currentUsers').html(data.join(" "))
  }

  function updateBoards(data) {
    for (var i=0; i<data.length; i++) {
      if($("." + data[i]).length === 0 && data[i] != APP.user) {
        appendBoard(data[i]);
      }
    }
  }

  function appendBoard(username) {
    var newBoard = $('#template').clone();
    newBoard.find('.username').html(username);
    newBoard.find('.text').attr('id', username);
    newBoard.show();
    $('#otherBoards').append(newBoard);
  }

  function _init() {
    bindEvents();
  }

  return {
    init: _init
  }
}());
