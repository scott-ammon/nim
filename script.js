// Variable definitions
var aiMode = false;
var player = 1;
var itemRemoved = false;
var selectedHeap = null;
var gameOver = false;
var heapObj = {
  "heap-one": 3,
  "heap-two": 5,
  "heap-three": 7
};

var initGame = function() {
  
  var playerOneName = $("input[name='player-one']").val();
  $('#player-one').text(playerOneName + "'s turn!");

  if(aiMode === true) {
    $('#player-two').text("AI's turn!");
  } else {
    var playerTwoName = $("input[name='player-two']").val();
    $('#player-two').text(playerTwoName + "'s turn!");
  }
  
  // fade in game board and display which user should play first
};

var resetGame = function() {
  // pop up modal window again
  $('.item').show();

  player = 1;
  gameOver = false;

  heapObj['heap-one'] = 3;
  heapObj['heap-two'] = 5;
  heapObj['heap-three'] = 7;

  $('#player-one').removeClass('disabled');
};

var runWinSequence = function() {
  // disable player switching since game is over
  if(player === 1) {
      $('#player-one').addClass('disabled');
    } else {
      $('#player-two').addClass('disabled');
    }
  // hide last remaining item
  setTimeout(function() {$('.item').fadeOut();},1000);

  console.log('Player ' + player + ' wins');
}

var aiMove = function() {
  // triggers the click event on the selected item
  // loop over the number of items AI wants to remove:
  $("#h2-2").triggerHandler("click");

}

var switchPlayer = function() {
  
  if(!itemRemoved) {
    M.toast({html: 'You have to remove at least one item!', classes: 'rounded'});
  } else {
    var heapSum = 0;
    for(heap in heapObj) {
      heapSum += heapObj[heap];
    }

    if(heapSum === 1) {
      gameOver = true;
      runWinSequence();
    }

    if(!gameOver) {
      if(player === 1) {
        player = 2;
        $('#player-one').addClass('disabled');
        $('#player-two').removeClass('disabled');
      } else {
        player = 1;
        $('#player-two').addClass('disabled');
        $('#player-one').removeClass('disabled');
      }
    }
  }

  // reset move boolean for next player to choose from any heap
  itemRemoved = false;

  if(aiMode && player === 2) {
    aiMove();
  }
};

var removeItem = function() {
  // dismiss all toast messages so they don't stack up
  M.Toast.dismissAll();

  // store heap of player's first clicked object
  if(!itemRemoved) {
    selectedHeap = $(this).parent().attr('id');
    itemRemoved = true;
  }

  // valid move if choosing an item from the same heap
  if($(this).parent().attr('id') === selectedHeap) {
    heapObj[selectedHeap]--;
    $(this).hide();
    // if the heap is emptied, auto switch the player
    if(heapObj[selectedHeap] === 0){
      // check if the player removed the final item themselves... stupid move!
      var heapSum = 0;
      for(heap in heapObj) {
        heapSum += heapObj[heap];
      }
      if(heapSum === 0) {
        gameOver = true;
        // run an endGame function here?
        console.log('Player ' + player + ' loses...');
      } else {
        switchPlayer();
      }
    }
  } else {
    // case where user selects an item from a second heap during a turn
    M.toast({html: 'You may only remove items from one heap!', classes: 'rounded'});
  }
};

$(document).ready(function() {
  // initialize and open the modal on page load
  $('.modal').modal({'opacity': 0.75});

  // event listeners for buttons in the modal window
  $('.mode-human').on("click", function() {
    aiMode = false;
    $('.modal-content').append("<label>Player 1 Name:<input type='text' name='player-one'></label><label>Player 2 Name:<input type='text' name='player-two'></label>");
  });

  $('.mode-comp').on("click", function() {
    aiMode = true;
    $('.modal-content').append("<label>Your Name:<input type='text' name='player-one'>");
  });
  
  $('.modal').modal('open');
  // remove an item when it is clicked on
  $(".item").on("click", removeItem);
  // reset the gameboard
  $(".reset").on("click", resetGame);
  // switch the current player
  $(".switch-player").on("click", switchPlayer);

  // initialize the game with options selected by user in modal
  $("a.modal-close").on("click", initGame);

});