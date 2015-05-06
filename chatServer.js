/* server node.js */
var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');
app.listen(3000);

function handler (req, res) {

  fs.readFile(__dirname + '/chat.html', function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading chat.html');
    }
    res.writeHead(200);
    res.end(data);

  });
}

io.sockets.on('connect', function (socket) {

  socket.on('addme', function (userName) {
    socket.userName = userName;
    socket.emit('chat', 'SERVER', 'You have connected');
    socket.broadcast.emit('chat', 'SERVER', userName + ' 進入聊天室');
  });

  socket.on('sendchat', function (data) {
    io.sockets.emit('chat', socket.userName, data);
  });

  socket.on('disconnect', function () {
    io.sockets.emit('chat', 'SERVER', socket.userName + ' 離開聊天室')
  });
});