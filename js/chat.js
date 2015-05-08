/* client chatroom */

/* set up connect */
  var socket = io.connect('http://192.168.0.235:3000');
    socket.on('connect', function () {
    socket.emit('addme', prompt('Who are you?'));
  });

/* chat */
  socket.on('chat', function (userName, data) {
    var p =  $('<p>');
    var $output = $('#output');
    p.html(userName + ': ' + data);
    $output.append(p);
    $output.scrollTop($output[0].scrollHeight);
  });

/* status - count */
  socket.on('statusCount', function (count) {
    $('.status-amount p span').text(count);
  });

/* status - name */
  socket.on('statusName', function (userName) {
    $('.status-name p span').text(userName);
  });

  socket.on('test', function (data) {
    console.log(data);
  });