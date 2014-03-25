var APP = {}

$(function(){
  APP.socket = io.connect('http://localhost:3700');
  WatchTyping.init();
})

var WatchTyping = (function() {

  function bindEvents() {
    $('html').on('keydown', checkKey);
  }

  function checkKey(event) {
    var $textWrap = $('#typeZone');
    var currentChar = $textWrap.html().charCodeAt(0);
    var charTyped = event.which;
    if (currentChar === charTyped) {
      updateText($textWrap);
      console.log("correct" + currentChar);
    } else {
      console.log("incorrect" + charTyped);
    }
  }

  function updateText($textWrap) {
    var newText = $textWrap.html().substr(1);
    $textWrap.html(newText);
    updateCallback($textWrap);
  }

  function _init() {
    bindEvents();
  }

  return {
    init: _init
  }
}());


// window.onload = function() {
//   var Chat = ( function() {
//     var messages = [];
//     var socket = io.connect('http://localhost:3700');

//     function bindEvents() {
//       var sendButton = document.getElementById("send");
//       socket.on('message', processMessage);
//       sendButton.onclick = sendMessage
//     }

//     function processMessage(data) {
//       var content = document.getElementById("content");
//       if(data.message) {
//         messages.push(data.message);
//         var html = '';
//         for(var i=0; i<messages.length; i++) {
//           html += messages[i] + '<br />';
//         }
//         content.innerHTML = html;
//       } else {
//         console.log("There is a problem with the page JS", data);
//       }
//     }

//     function sendMessage() {
//       var field = document.getElementById("field");
//       socket.emit('send', { message: field.value });
//     }

//     function _init() {
//       bindEvents();
//     }

//     return {
//       init: _init
//     }
//   }());

//   Chat.init();
// }