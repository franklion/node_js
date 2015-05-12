/* client chatroom */

var ip   = '192.168.0.235';
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
  var template = $('#template').html();
  var $popListContent = $('.popList-content');
  var $content = $popListContent.html();
  socket.on('statusList', function (personsList) {

    $popListContent.html($content);

    var length = personsList.length;

    for (var i = 0 ; i < length ; i++) {
      var temp = template.replace(/{name}/, personsList[i]);
      $popListContent.prepend(temp);
    }

    $('.popList-top h3').html(length + ' Online');
  });
});

/* main js */
$(function () {

/* emit input text */
  var inputText;
  var fontColor;
  $('#send-text').click(function () {

    inputText = $('#data').val();
    if (inputText !== '') {
      socket.emit('sendchat', inputText, fontColor);
      $('#data').val('');
    }

  });

/* input text auto emit */
  $('#data').keyup(function (event) {

    if(event.keyCode == 13 ) {
      $('#send-text').click();
      $(this).val('');
    }
  });

/* pop the list */
  $('.send-bar-list').click(function () {
    $('.popList').animate({
      right: -280
    }, 1000 , 'easeOutBounce');
  });

/* close the pop list */
  $('.clear').click(function () {
    $('.popList').animate({
      right: 10
    }, 800 , 'easeInSine');
  });

/* pop the color bar */
  $('.set-font-color').click(function () {
    $('.popColor').slideDown('slow');
  });

/* set the font color */
  $('.popColor ul li').click(function () {
    fontColor = $(this).css('backgroundColor');
    $('.popColor').slideUp('slow');
  });

/* color bar */
  var dataColor = [
    '#ff9eb7',
    '#80d04b',
    '#03c8fa',
    '#f9a68f',
    '#d62d20',
    '#8855dd',
    '#7e7217',
    '#e7d9aa'
  ];

/* init the color bar */
  $('.popColor ul li').each(function (index) {
    $(this).css({backgroundColor: dataColor[index]});
  });
});
