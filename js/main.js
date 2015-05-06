/* main js */
$(function () {

  console.log(123);
  var inputText;
  $('#data').keyup(function (event) {
    if(event.keyCode == 13) {
      inputText = $(this).value();
      $('#send-text').click();
    }
  });

  $('#send-text').click(function () {
    console.log(inputText);
  });

});
