// Variable definitions

var heapObj = {
	"heap-one": 3,
	"heap-two": 5,
	"heap-three": 7
};


var initGame = function() {
	// display modal window that selects 2p or 1 v comp, and enters usernames
	// set mode of game play for either 2p or person v computer
	// fade in game board and display which user should play first
};

var resetGame = function() {
	// pop up modal window again
	 $('.item').show();
};

var checkForWin = function() {
  // enter this function if there is one heap left
};

var removeItem = function() {
  
  // find heap of object and remove it from heap array
  var heapOfItem = $(this).parent().attr('id');
  heapObj[heapOfItem]--;
  console.log(heapObj);
 
  // hide the clicked item from the correct heap
  $(this).hide();
};

// keep this section minimal, call functions outside
$(document).ready(function() {
  console.log('js is working');

  $(".item").on("click", removeItem);

  $(".reset").on("click", resetGame);

});