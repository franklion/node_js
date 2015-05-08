/* client chatroom */

/* set up connect */
  var ip   = 'http://192.168.0.235';
  var port = '3000';
  var socket = io.connect(ip + ':' + port);
    socket.on('connect', function () {
    socket.emit('addme', prompt('Who are you?'));
  });

/* publish login and logout messages */

  var $output;
  socket.on('LogInOutMessages', function (userName, data) {
    var $logINOut = $('<h3>');
    publishMessages($logINOut, userName, data);
  });

/* publish global messages */
  var $globalMessage;
  socket.on('globalMessages', function (userName, data) {
    $globalMessage = $('<p>');
    publishMessages($globalMessage, userName, data);
  });

/* function for publish messages */
  function publishMessages(selector, userName, data) {
    $output = $('#output');
    selector.html(userName + ':' + data);
    $output.append(selector);
    $output.scrollTop($output[0].scrollHeight);
  }

/* set fontColor */
  socket.on('setFontColor', function (fontColor) {
    var fontColor = '#' + fontColor;
    console.log($globalMessage.text());
    $globalMessage.css({color: fontColor});
  });

/* status - count */
  socket.on('statusCount', function (count) {
    $('.status-amount p span').text(count);
  });

/* status - name */
  socket.on('statusName', function (userName) {
    $('.status-name p span').text(userName);
  });
