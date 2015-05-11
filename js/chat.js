/* client chatroom */

var ip   = '192.168.0.247';
var port = '3000';
var socket = io.connect(ip + ':' + port);
var loginStatus = 'false';


$(function () {

  /* connect with server */
  socket.on('connect', function () {
    socket.emit('loginCheck', prompt('請輸入你的暱稱?'));
  });

  /* disconnect with server */
  socket.on('disconnect', function () {
    alert('You have disconnected with server!');
    location.reload();
  });

  /* login status */
  socket.on('loginStatus', function (status) {
    if (!status) {
      loginStatus = false;
      socket.emit('loginCheck', prompt('名稱重複囉~ 換個暱稱吧!'));
    } else {
      loginStatus = true;
    }
  });

  /* publish login and logout messages */
  var $chatBoard;
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
    $chatBoard = $('#output');
    selector.html(userName + ':' + data);
    $chatBoard.append(selector);
    $chatBoard.scrollTop($chatBoard[0].scrollHeight);
  }

  /* set fontColor */
  socket.on('setFontColor', function (Color) {
    var fontColor = '#' + Color;
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

  /* status - persons list */
  socket.on('statusList', function (personsList) {

  });


  var template = $('#template').html();
  var $popListContent = $('.popList-content');
  var $content = $popListContent.html();
  socket.on('test', function (personsList) {

    $popListContent.html($content);

    var length = personsList.length;

    for (var i = 0 ; i < length ; i++) {
      var temp = template.replace(/{name}/, personsList[i]);
      $popListContent.prepend(temp);
    }

    $('.popList-top h3').html(length + ' Online');
  });
});
