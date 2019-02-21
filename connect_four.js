/*
[X] Get player names to assign colors red and black
    [X] get player 1 name
        [X] assign red to player 1
    [X] get player 2 name
        [X] assign black to player 2

[X] Create function to change color of space/button at given row/col
[X] Create function to identify/find the color of a space/button
[X] Create function to check the bottom-most available cell in row
[X] Create function to check for a 4 color match
[x] Create functions to check win conditions
    [X] vertical win
    [X] horizontal win
    [X] diagonal win
[X] Create function to declare win or draw
*/
var playerOne = prompt("Player One: Enter Your Name , you will be Black!!!");
var playerOneColor = 'rgb(0,0,0)';

var playerTwo = prompt("Player Two: Enter Your Name, you will be Red!!!");
var playerTwoColor = 'rgb(255, 0, 0)';

//var game_on = true;
// grab table cells with jQuery

var table = $('table tr');

// http://stackoverflow.com/questions/6139407/getting-td-by-index-with-jquery
function gameOver(rowNum, colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}
// Change the color of a button
function changeColor(rowIndex, colIndex, color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

// Report Back to current color of a button
function findColor(rowIndex, colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// Take in column index, returns the bottom row that is still gray
function checkBottom(colIndex) {
  var colorReport = findColor(5, colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = findColor(row, colIndex);
    if (colorReport === 'rgb(255, 255, 255)') {
      return row;
    }
  }
}

// check that 4 colors match, are not grey, and are not undefined
function colorMatch(one, two, three, four) {
  return (one === two && one === three && one === four && one !== 'rgb(255, 255, 255)' && one !== undefined);
}

// Check for Horizontal Wins
function horizontalWin() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatch(findColor(row, col), findColor(row, col + 1), findColor(row, col + 2), findColor(row, col + 3))) {
        console.log('horiz');
        gameOver(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function verticalWin() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatch(findColor(row, col), findColor(row + 1, col), findColor(row + 2, col), findColor(row + 3, col))) {
        console.log('vertical');
        gameOver(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagonalWin() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatch(findColor(row, col), findColor(row + 1, col + 1), findColor(row + 2, col + 2), findColor(row + 3, col + 3))) {
        console.log('diag');
        gameOver(row, col);
        return true;
      } else if (colorMatch(findColor(row, col), findColor(row - 1, col + 1), findColor(row - 2, col + 2), findColor(row - 3, col + 3))) {
        console.log('diag');
        gameOver(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

// Game End
function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $('h3').fadeOut('fast');
      $('h2').text("Nice one " + winningPlayer + ", you won! Refresh the browser if you'd like to play again!").css("fontSize", "30px");
      $('h1').text("Got 'em!!!").css("fontSize", "50px");
    }
  }
}

/********** GAME LOGIC **********/

// Start with Player One
var currentPlayer = 1;
var currentName = playerOne;
var currentColor = playerOneColor;

// Start with Player One
$('h3').text("Alright " + playerOne + "; black goes first so just pick a column and drop that chip!");

$('.board button').on('click', function () {

  // Recognize what column was chosen
  var col = $(this).closest("td").index();

  // Get back bottom available row to change
  var bottomAvail = checkBottom(col);

  // Drop the chip in that column at the bottomAvail Row
  changeColor(bottomAvail, col, currentColor);

  // Check for a win or a tie.
  if (horizontalWin() || verticalWin() || diagonalWin()) {
    gameEnd(currentName);
  }

  // If no win or tie, continue to next player
  currentPlayer = currentPlayer * -1;

  // Re-Check who the current Player is.
  if (currentPlayer === 1) {
    currentName = playerOne;
    $('h3').text("It's your turn " + currentName + "; drop that black piece wisely!");
    currentColor = playerOneColor;
  } else {
    currentName = playerTwo;
    $('h3').text("It's your turn " + currentName + "; drop that red piece wisely!");
    currentColor = playerTwoColor;
  }

});