var APP = {}

$(function(){
  APP.socket = io.connect('http://localhost:3700');
  WatchTyping.init();
})

var WatchTyping = (function() {

  function bindEvents() {
    $('html').on('keydown', checkKey);
    APP.socket.on('message', updateTextUniversal);
  }

  function updateTextUniversal(data) {
    $('#typeZone').html(data.message)
  }

  function checkKey(event) {
    var $textWrap = $('#typeZone');
    var currentChar = $textWrap.html().charCodeAt(0);
    var charTyped = event.which;
    if (currentChar === charTyped) {
      updateText($textWrap, sendSocket);
      console.log("correct" + currentChar);
    } else {
      console.log("incorrect" + charTyped);
    }
  }

  function updateText($textWrap, updateCallback) {
    var newText = $textWrap.html().substr(1);
    $textWrap.html(newText);
    updateCallback(newText);
  }

  function sendSocket(newText) {
    APP.socket.emit('send', { message: newText})
  }

  function _init() {
    bindEvents();
  }

  return {
    init: _init
  }
}());