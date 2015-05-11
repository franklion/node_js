/* main js */
$(function () {

  /* emit input text */
  $('#send-text').click(function () {
    var text = $('#data').val();
    socket.emit('sendchat', text);
    $('#data').val('');
  });

  /* input text auto commit */
  var inputText;
  $('#data').keyup(function (event) {

    if(event.keyCode == 13) {
      inputText = $(this).val();
      $('#send-text').click();
      $(this).val('');
    }
  });


  /*
  $('#send-bar-list').click(function () {

    $('.popList').animate({
      //opacity: 100,
      right: -280
    }, 1500 );
  });*/

});
