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
