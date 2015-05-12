/* main js */
$(function () {

  /* emit input text */
  var inputText;
  $('#send-text').click(function () {

    inputText = $('#data').val();
    if (inputText !== '') {
      socket.emit('sendchat', inputText);
      $('#data').val('');
    }

  });

  /* input text auto commit */
  $('#data').keyup(function (event) {

    if(event.keyCode == 13 ) {
      $('#send-text').click();
      $(this).val('');
    }
  });

  /* pop the list */
  $('.send-bar-list').click(function() {
    $('.popList').animate({
      right: -280
    }, 1000 , 'easeOutBounce');
  });

  /* close the pop list */
  $('.clear').click(function() {
    $('.popList').animate({
      right: 10
    }, 800 , 'easeInSine');
  });

});
