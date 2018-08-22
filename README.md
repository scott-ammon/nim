# Nim - A Math Strategy Game
## General Assembly Unit 1 Project
Play online: https://scott-ammon.github.io/nim/

### This game was developed with:
* HTML
* CSS
* JavaScript
* jQuery
* Materialize

### Description

For our first project deliverable, I built a version of Nim, a simple mathematical strategy game where players take turns removing items from three distinct piles. Players can remove as many items from one single pile during a turn. The player who is left to remove the last remaining piece loses. It's a simple game to play, but involves some interesting math to calculate the optimal move on each turn which lends itself well to this first project. 

The first step was wireframing the basic layout of the game, which I drew in Adobe Sketch on my iPad. This makes it really easy to visualize the HTML layout and determine element placement. I'm also using Materialize for the first time, so figuring out what classes to add in order to acheive the visual appearance took some time. I wanted a really clean and simple layout that looks professional, as well as looking good on mobile. 

![wireframe](img/project1-wireframe.png?raw=true)

Once it was time to start coding, I wanted to break this game down into solvable pieces, and ensure that each phase worked well before moving on to the next. The first logical step was to create the simple two-player version that alternates between turns and checks for win conditions. In order to plan out the creation of the game, I've been tracking certain pieces on a Trello board, shown below in the in-progress state.

![trello](img/trello.png?raw=true)

### Minimum Viable Product (MVP)

As I progressed through the development and checked off items from the Trello board, I reached a minimum viable product. The image below shows the first iteration of the game which implements a simple two player functionality. I kept the design simple, and didn't spend much time on the visual design at this point since I wanted to focus on building up the logic. I decided to use jQuery to simplify the selection of items on the gameboard. I learned that I actually feel more comfortable using vanilla JS, as it's less abstracted which makes it easier to see what the code is doing. With jQuery, there is more implementation behind the scenes that certainly helps me be concise as a developer, but the extra layer of abstraction is not something I'm necessarily fond of.

![gameboard](img/gameboard.png?raw=true)


### Creating the AI Player

After building the two-player version, I decided to implement a computer player that is able to beat a human player under the 'misere' style of playing conditions. 'Misere' represents the style where the player who is left to remove the last piece is the loser. This is programmatically more difficult than normal game play where the player who takes the last piece wins, which I'll explain further on.

#### Game Logic:

The correct game moves can be determined using something called a 'nim-sum' which is the binary digital sum of the quantities of items in each pile. I initially thought I would have to convert each pile quantity into a binary number, and then write a function to calculate the digital sum (not the same as addition). After a lot of brainstorming and googling, I found out that the JavaScript array reduce method could simplify this process for me. Raising the accumulator to the power of the next item passed into the reduce function will actually resolve to the binary digital sum!

```javascript
var binarySum = array.reduce(function(x, y) {return x ^ y;});
```

There is a mathematical proof which demonstrates that if the gameboard has a non-zero nim-sum, the next player will always have a particular move that can create a zero nim-sum. The opposite is also true - if the nim-sum is made to be zero on a turn, the next player will ALWAYS make the nim-sum non-zero after moving any number of items from any pile. While this may sound confusing, it actually makes gameplay pretty simple: find the nim-sum of the current board state and determine how many pieces to remove from a pile to reduce the nim-sum to zero. If it's your turn and the nim-sum is already zero, then you're going to lose unless the other player makes a mistake on a later turn!

Once you have the 'nim-sum' of the gameboard (call it N), you calculate the nim-sums of each pile with N. Assuming N is non-zero on your turn, you should remove items from whichever pile's nim-sum with N is less than the pile size. This was accomplished through a simple loop to check each sum against the pile size, and then create an object that stores the specific pile and quantity to remove.

The hard part was handling the end state of the gameboard, as I had to check to see whether the computer has the chance to create an odd number of piles with one item each. This is the goal, as that would make alternating play leave the other player with the last item to remove (and therefore lose).

I struggled with the organization of this code block, so pseudocode helped to break it down:
* determine if there is only one pile with greater than one item left
* if yes, determine if the number of remaining piles with one item would be ODD if you reduce the size of the one remaining large pile
* if it's possible to make an odd number of 1-item piles, do it
* else if there's an even number of piles, remove the entire heap (because this means there are only two piles left, so reduce the big one to zero, leaving one piece remaining in the other pile for the win!)
* Note: if there is more than one pile with greater than one item left, then run the normal nim-sum code block to determine the heap and quantity to remove

One element I am proud of in this code is creating a separate "aiComputeMove" function to make this modular. Essentially, I can write another different algorithm for the computer player, and replace the existing function without affecting the remainder of the game. The only requirement is that I return an object that identifies the heap and quantity to remove using the syntax in the aiPlayTurn function. Eventually, I'd like to try and implement more difficult algorithms to calculate moves (although the method used here is simple, it is guaranteed to win...).

### Polishing the Layout

Finally, after completing the computer player logic, I reworked some CSS and Materialize properties to give the game a more polished appearance. The screenshots below show the revised layout in both a mobile and desktop version.

![final-menu](img/final-menu.png?raw=true)

![final-layout](img/final.png?raw=true)

By using Materialize, the responsiveness was basically handled automatically. I had to add only one media query to adjust individual game pieces to show up properly on mobile screens and adjust the font sizes of some buttons. Below is a screenshot of an iPhone 6/7/8 size:

![responsive-menu](img/responsive-menu.png?raw=true)

![responsive-final](img/responsive-final.png?raw=true)

### Result and Next Steps

Overall, I'm pleased with the way the game turned out, although there are some bugs that need to be worked out. For example, the most difficult part was determining why the game would not load on mobile initially. It turns out, I was using Materialize radio buttons, which don't register properly with jQuery. I plugged my phone into my laptop, and pulled up the JavaScript console which logged that jQuery was throwing a syntax error for input[type="radio"]. Although there may be some ways to work around this, in my limited time I replaced the radio buttons with actual buttons, and this allowed the game to load and the Materialize modal to function. The only remaining issue is that the game sometimes snags near the end and no longer allows clicking on screen buttons. I hope to troubleshoot that shortly, as the mobile version is the most fun to play!

Future items i'd like to implement are:

* Adjust modals to perhaps only open on button click for new game instead of page load
* Another AI mode that uses minimax or another algorithm to determine gameplay
* Better mobile experience that handles Materialize radio buttons
* More advanced animations on win state and player switching

