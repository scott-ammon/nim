

$(document).ready(function() {
  console.log('working!');

  $(".item").draggable();

  $(".item").on('click', function() {
    $(this).remove();
  });
});