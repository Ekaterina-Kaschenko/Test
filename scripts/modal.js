$( document ).ready(function() {
  $('.trigger').on('click', function() {
    $('.modal-wrapper').toggleClass('open');
    $('.test-result')[0].innerHTML = 'У вас ' + window.Test.countAnswer + ' правильных ответов';
    Test.clearCheckboxes();
    return false;
  });
})