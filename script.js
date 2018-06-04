var heapObj = {
	"heap-one": 3,
	"heap-two": 5,
	"heap-three": 7
};

function removeItem() {
  console.log($(this).parent().attr('id'));

  // find heap of object and remove it from heap array
  var heapOfItem = $(this).parent().attr('id');
  heapObj[heapOfItem]--;
  console.log(heapObj);
 
  // remove the clicked item from the correct heap
  $(this).remove();
};


$(document).ready(function() {
  console.log('js is working');

  $(".item").on('click', removeItem);

});