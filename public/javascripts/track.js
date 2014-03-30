$(function(){
  Track.init();
})

var Track = (function(){
  function bindEvents() {
    APP.socket.on('updateClients', updateTrack)
  }

  function updateTrack(data) {
    updateClientList(data);
    updateLanes(data);
  }

  function updateClientList(data) {
    var clientList = ''
    for(var i=0; i<data.length; i++) {
      clientList += '<p class="user">' + data[i] + '</p>'
    }
    $('#currentUsers').html(clientList);
  }

  function updateLanes(data) {
    for (var i=0; i<data.length; i++) {
      if($("#" + data[i]).length === 0 && data[i] != APP.user) {
        appendLane(data[i]);
      }
    }
  }

  function appendLane(username) {
    var newLane = $('#template').clone();
    newLane.find('.username').html(username);
    newLane.find('.text').attr('id', username);
    newLane.show();
    $('#otherLanes').append(newLane);
  }

  function _init() {
    bindEvents();
  }

  return {
    init: _init
  }
}());
