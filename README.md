# unit1-game
General Assembly Unit 1 Project - Nim Game with Computer Player

For our first project deliverable, I'm building a version of Nim, a simple mathematical strategy game where players take turns removing items from three distinct piles. Players can remove as many items from one single pile during a turn. The player who is left to remove the last remaining piece loses. 

The first step was wireframing the basic layout of the game, which I drew in Adobe Sketch on my iPad. This makes it really easy to visualize the HTML layout and determine element placement. I'm also using Materialize for the first time, so figuring out what classes to add in order to acheive the visual appearance took some time.

![wireframe](img/project1-wireframe.png?raw=true)


I wanted to break this game down into solvable pieces, and ensure that each phase worked well before moving on to the next. The first logical step was to create the simple 2 player version that alternates between turns and checks for a win. In order to plan out the creation of the game, I've been tracking certain pieces on a Trello board, shown below in the in-progress state.

![trello](img/trello.png?raw=true)

As I progressed through the development and checked off items from the Trello board, I finally reached a minimum viable product. The image below shows the first iteration of the game which implements a simple two player functionality.

![gameboard](img/gameboard.png?raw=true)

By using Materialize, the responsiveness was basically handled automatically. I only had to add one media query to adjust individual game pieces to show up properly on mobile screens. Below is a screenshot of an iPhone 6/7/8 size:

![responsive](img/responsive.png?raw=true)

I decided to implement a computer player that is able to beat a human player under the 'misere' style of playing conditions - where the player who has to remove the last piece is the loser. This makes it more difficult than normal game play where the player who takes the last piece wins, which I'll explain further on. First, the correct game moves can be determined using something called a 'nim-sum' which is actually a binary digital sum of the quantities of items in each pile. 

There is a mathematical proof which demonstrates that if the gameboard has a non-zero nim-sum, the next player will always have a particular move that can create a zero nim-sum. The corollary is also true - if the nim-sum is made to be zero, the next player will ALWAYS make the nim-sum non-zero after moving any number of items from any pile. While this may sound confusing, it actually makes gameplay pretty simple - find the nim-sum of the current board state and determine how many pieces to remove from a pile to reduce the nim-sum to zero. If it's your turn and the nim-sum is already zero, then you're going to lose unless the other player makes a mistake on a later turn!

The hardest part of implementing this pattern of gameplay is that when you near the end of the game, you want to try and reduce the board to an odd number of piles with one item in them each. This will guarantee a win on your part because as you alternate removing one item, your partner will inevitably be stuck with the last remaining item and lose! I struggled with the organization of this code block, as it requires that you:
* determine if the next move is able to reduce the board to an ODD number of piles with one item each
* identify which pile can be reduced to leave one remaining item
* only remove that item instead of using the normal nim-sum mode of gameplay