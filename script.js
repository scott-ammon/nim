var aiMode = false;      // whether computer mode is enabled
var player = 1;          // tracks current player (1 or 2...2 is also computer)
var itemRemoved = false; // tracks whether player has made an initial move
var selectedHeap = null; // tracks which heap the computer should choose from
var gameOver = false;    // changes on win conditions
var heapObj = {          // stores item quantity in each heap
  "heap-one": 3,
  "heap-two": 5,
  "heap-three": 7
};

var initGame = function() {
  // display the player names on the game buttons
  if($("input[name='player-one']").val()) {
    var playerOneName = $("input[name='player-one']").val();
    $('#player-one').text(playerOneName);
  }
  if(aiMode === true) {
    $('#player-two').text("");
    $('#player-two').append("<i class='material-icons'>computer</i>");
  } else {
    if($("input[name='player-two']").val()){
      var playerTwoName = $("input[name='player-two']").val();
      $('#player-two').text(playerTwoName);
    }
  }
};

var resetGame = function() {
  $('h1').remove();

  player = 1;
  gameOver = false;

  heapObj['heap-one'] = 3;
  heapObj['heap-two'] = 5;
  heapObj['heap-three'] = 7;

  $('#player-one').removeClass('disabled');
  $('#player-two').addClass('disabled');
};

var runWinSequence = function() {
  // disable player switching since game is over
  if(player === 1) {
      $('#player-one').addClass('disabled');
      var playerName = $('#player-one').text();
    } else {
      $('#player-two').addClass('disabled');
      var playerName = $('#player-two').text();
    }

  // hide last remaining item
  setTimeout(function() {
    $('.item').fadeOut();
    setTimeout(function() { $('.heap-two').append("<h1>" + playerName + " wins!</h1>"); }, 500);
  },500);
};

// this function reviews the game board and determines quantity and heap to draw from
var aiComputeMove = function() {
  var heapArray = [];    // array of numbers existing in each heap
  var itemsToRemove = {  // stores the number of items to remove from a heap
    "heap-index": null,
    "quantity": null
  };

  for(heap in heapObj) {
      heapArray.push(heapObj[heap]);
  }

  // check if possible to make odd number of heaps with one item in each
  var largeHeap = 0;
  for(let i = 0; i < heapArray.length; i++) {
    if(heapArray[i] > 1) {
      largeHeap++;
    }
  }

  // if there is only one heap to reduce down to 1
  if(largeHeap <= 1) {
    //get number of piles greater than 0
    var numHeaps = 0;
    for(let i = 0; i < heapArray.length; i++) {
      if(heapArray[i] > 0) {
        numHeaps++;
      }
    }
    // determine if number of piles remaining is odd
    var maxHeap = Math.max(...heapArray);
    var maxHeapIndex = heapArray.indexOf(maxHeap);
    itemsToRemove["heap-index"] = maxHeapIndex;

    if(numHeaps % 2 === 1) {
      // leave one item in the heap to make odd number of 1-item heaps remaining
      itemsToRemove["quantity"] = maxHeap - 1;
    } else {
      // remove the whole heap if an even num of heaps remains
      itemsToRemove["quantity"] = maxHeap;
    }
    return itemsToRemove;
  }

  // reduce method with exponents returns the binary digital sum!
  var binarySum = heapArray.reduce(function(x, y) { return x^y;});

  // get nim sums of each heap and the binarySum
  var heapSums = heapArray.map(function(heapSize) {return heapSize ^ binarySum});

  // check if any of the individual heap sums are smaller than the heap
  for(let i = 0; i < heapSums.length; i++) {
    if(heapSums[i] < heapArray[i]) {
      itemsToRemove["heap-index"] = i;
      itemsToRemove["quantity"] = heapArray[i] - heapSums[i]; 
      // check for case where next move reduces to all heap sizes of 1
      var move = 'Move: Take ' + (heapArray[i] - heapSums[i]) + ' from heap ' + (i+1);
    } else {
      var index = heapArray.indexOf(Math.max(...heapArray)) + 1;
    }
  }

  // if no useful move found (e.g. the nim sum is zero), just remove 1 from largest heap
  if(!itemsToRemove["quantity"]) {
    itemsToRemove["heap-index"] = heapArray.indexOf(Math.max(...heapArray));
    itemsToRemove["quantity"] = 1; 
  }

  return itemsToRemove;
}

// this function calls the aiComputeMove and then plays the calculated moves
var aiPlayTurn = function() {
  
  var maxHeaps = { "heap-one": 3,
                   "heap-two": 5,
                   "heap-three": 7
  };
  var itemIds = { "heap-one": ["h1-1", "h1-2", "h1-3"],
                  "heap-two": ["h2-1", "h2-2", "h2-3", "h2-4", "h2-5"],
                  "heap-three": ["h3-1", "h3-2", "h3-3", "h3-4", "h3-5", "h3-6", "h3-7"]
                };

  // function returns object with the heap to pull from, and how many to pull
  var itemsToRemove = aiComputeMove();

  console.log("Computer wants to remove: ", itemsToRemove);

  // get the name of the heap to match the class of the divs in html
  var heapKeys = Object.keys(heapObj);
  var heapName = heapKeys[itemsToRemove["heap-index"]];

  var quantityToRemove = itemsToRemove["quantity"];

  var quantityRemoved = 0;
  var itr = 0;

  var idString = '';

  // remove correct quantity of children
  while(quantityRemoved < quantityToRemove) {
    
    idString = "#" + itemIds[heapName][itr];
    console.log('idString: ', idString, 'itr: ', itr);

    if($(idString).css("display") != 'none') {

      $(idString).triggerHandler("click");
      quantityRemoved++;

      // if you reach end of the heap, loop back to beginning
      // this handles case where someone pulls from the middle
      if(itr > maxHeaps[heapName]) {
        itr = 0;
      }
    }
    itr++;
  };

  // switch player button when computer is done taking turn
  player = 1;
  $('#player-two').addClass('disabled');
  $('#player-one').removeClass('disabled');  
};

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
    aiPlayTurn();
    itemRemoved = false;
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

  console.log($(this).attr('id'));

  // valid move if choosing an item from the same heap
  if($(this).parent().attr('id') === selectedHeap) {
    heapObj[selectedHeap]--;
    $(this).hide(500);
    // if the heap is emptied, auto switch the player
    if(heapObj[selectedHeap] === 0){
      // check if the player removed the final item themselves... stupid move!
      var heapSum = 0;
      for(heap in heapObj) {
        heapSum += heapObj[heap];
      }
      if(heapSum === 0) {
        gameOver = true;
        player === 1 ? player = 2 : player = 1;
        runWinSequence();
        // run an endGame function here?
      } else {
        setTimeout(switchPlayer,500);
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

  $('.tooltipped').tooltip();
  $('.sidenav').sidenav();

});