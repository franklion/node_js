/* client chatroom*/
/*var socket = io.connect('http://localhost:3000');
socket.on('connect', function () {
  socket.emit('addme', prompt('Who are you?'));
});

socket.on('chat', function (userName, data) {
  var p = document.createElement('p');
  p.innerHTML = userName + ': ' + data;
  document.getElementById('output').appendChild(p);
});

window.addEventListener('load', function () {
  document.getElementById('send-text').addEventListener('click', function () {
    var text = document.getElementById('data').value;
    socket.emit('sendchat', text);
  }, false);
}, false);*/