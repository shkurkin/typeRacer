var APP = {}

$(function(){
  APP.socket = io.connect(window.location.hostname);
  WatchTyping.init();
})

var WatchTyping = (function() {

  function bindEvents() {
    $('html').on('keydown', checkKey);
    APP.socket.on('updateText', updateTextUniversal);
  }

  function updateTextUniversal(data) {
    $('#' + data.user).html(data.message);
  }

  function checkKey(event) {
    if(event.which === 8){
      event.preventDefault();
    }
    var $textWrap = $('#userText');
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
    APP.socket.emit('keypress', {
      user: APP.user,
      message: newText
    });
  }

  function _init() {
    bindEvents();
  }

  return {
    init: _init
  }
}());