$(function() {
  APP.socket.on('make user', function(data) {
    APP.user = APP.user || data
  });
});