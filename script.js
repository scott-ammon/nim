// Variable definitions
var player = 1;
var itemRemoved = false;
var selectedHeap = null;
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

var switchPlayer = function() {
  // player === 1 ? player = 2 : player = 1;
  if(player === 1) {
  	player = 2;
    $('#player-one').addClass('disabled');
    $('#player-two').removeClass('disabled');
  } else {
  	player = 1;
    $('#player-two').addClass('disabled');
    $('#player-one').removeClass('disabled');
  }
  // reset move boolean for next player
  itemRemoved = false;

  // change color of items to current player color
}

var removeItem = function() {
	// dismiss all toast messages so they don't stack up
  M.Toast.dismissAll();

  // store heap of player's first clicked object
  if(!itemRemoved) {
    selectedHeap = $(this).parent().attr('id');
    itemRemoved = true;
  }
  console.log('selectedHeap: ', selectedHeap);
  console.log('id of clicked: ', $(this).parent().attr('id'));

  // check to see if valid move
  if($(this).parent().attr('id') === selectedHeap) {
  	heapObj[selectedHeap]--;
    console.log(heapObj);
    // hide the clicked item from the correct heap
    $(this).hide();

    // if the heap is empty, auto switch the player
    if(heapObj[selectedHeap] === 0){
    	switchPlayer();
    }
  } else {
  	M.toast({html: 'Only remove items from one heap!', classes: 'rounded'});
  }
};

$(document).ready(function() {
  console.log('js is working');

  // remove an item when it is clicked on
  $(".item").on("click", removeItem);

  // reset the gameboard
  $(".reset").on("click", resetGame);

  // switch the current player
  $(".switch-player").on("click", switchPlayer);

});