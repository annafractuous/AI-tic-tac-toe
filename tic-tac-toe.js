var spaces = ["0", " ", " ", " ", " ", " ", " ", " ", " ", " "];
var user;
var computer;
var turn;
var winner = "Nobody";


var printBoard = function() {
    console.log(" "+ spaces[1] + " | " + spaces[2] + " | " + spaces[3]);
    console.log("---|---|---");
    console.log(" "+ spaces[4] + " | " + spaces[5] + " | " + spaces[6]);
    console.log("---|---|---");
    console.log(" "+ spaces[7] + " | " + spaces[8] + " | " + spaces[9]);
};


var selectLetter = function(userChoice){
    userChoice = userChoice.toUpperCase();
    if (userChoice == "X") {
        user = "X";
        computer = "O";
    }
    else if (userChoice == "O") {
        user = "O";
        computer = "X";
    }
    else {
        var xo = prompt("Sorry, that's not a valid choice. Please pick either X or O.");
        selectLetter(xo);
    }
};


var firstMove = function() {
    var roll = Math.floor(Math.random() * 2);
    if (roll === 0) {
        turn = "Computer";
    }
    else {
        turn = "User";
    }
    return turn;
};


var getUserMove = function(){
    var move;
    move = prompt("Where would you like to move? Pick a value 1-9.");
    move = parseInt(move);
    if (spaces[move] == "X" || spaces[move] == "O") {
       console.log("That square is already taken. Please pick an empty square.");
       getUserMove();
    }
    else if (move == 1 || move == 2 || move == 3 || move == 4 || move == 5 || move == 6 || move == 7 || move == 8 || move == 9) {
       spaces[move] = user;
    }
    else {
      console.log("Sorry, that's not a valid move. Pick a number 1-9.");
      getUserMove();
    }
};


var computerMove = function() {
    var mentalBoard = [];
    var possibleMoves = [];
    var move;
  
    for (i = 0; i < 10; i++) {
      mentalBoard[i] = spaces[i];
    }

    for (i = 1; i < 10; i++) {
        if (mentalBoard[i] == " ") {
            possibleMoves.push(i);
        }
    }

    //COMPUTER AI
    for (i = 0; i < possibleMoves.length; i++) {
        move = possibleMoves[i];
        mentalBoard[move] = computer;
        if (gameWon(mentalBoard, computer) === true) {
            return move;
        }
        mentalBoard[move] = " ";
    }
    
    for (i = 0; i < possibleMoves.length; i++) {
        move = possibleMoves[i];
        mentalBoard[move] = user;
        if (gameWon(mentalBoard, user) === true) {
            winner = "Nobody";
            return move;
        }
        mentalBoard[move] = " ";
    }

    if (mentalBoard[5] == " ") {
        return 5;
    }
    else if (mentalBoard[1] == " " || mentalBoard[3] == " " || mentalBoard[7] == " " || mentalBoard[9] == " ") {
        do {
            move = Math.floor(Math.random() * 9 + 1);
        }
        while ((move != 1 && move != 3 && move != 7 && move != 9) || mentalBoard[move] != " ");
        return move;
    }
    else if (mentalBoard[2] == " " || mentalBoard[4] == " " || mentalBoard[6] == " " || mentalBoard[8] == " ") {
        do {
            move = Math.floor(Math.random() * 7 + 2);
        }
        while ((move != 2 && move != 4 && move != 6 && move != 8) || mentalBoard[move] != " ");
        return move;
    }
};


var boardFull = function() {
  for (i = 1; i < 10; i++) {
    if (spaces[i] == " ") {
      return false;
    }
  }
  return true;
};


var gameWon = function(board, letter) {
  //across the top
  if(board[1] == letter && board[2] == letter && board[3] == letter) {
    winner = letter;
    return true;
  }
  //across the middle
  else if(board[4] == letter && board[5] == letter && board[6] == letter) {
    winner = letter;
    return true;
  }
  //across the bottom
  else if(board[7] == letter && board[8] == letter && board[9] == letter) {
    winner = letter;
    return true;
  }
  //down the left side
  else if(board[1] == letter && board[4] == letter && board[7] == letter) {
    winner = letter;
    return true;
  }
  //down the middle
  else if(board[2] == letter && board[5] == letter && board[8] == letter) {
    winner = letter;
    return true;
  }
  //down the right side
  else if(board[3] == letter && board[6] == letter && board[9] == letter) {
    winner = letter;
    return true;
  }
  //right diagonal
  else if(board[7] == letter && board[5] == letter && board[3] == letter) {
    winner = letter;
    return true;
  }
  //left diagonal
  else if(board[1] == letter && board[5] == letter && board[9] == letter) {
    winner = letter;
    return true;
  }
  return false;
};


var playAgain = function() {
    //resets game
    spaces = ["0", " ", " ", " ", " ", " ", " ", " ", " ", " "];
    winner = "Nobody";
    
    var play = confirm("Would you like to play again?");
    if (play === true) {
        gamePlay();
    }
    else {
        console.log("Okay. See you later!");
    }
}; 


var gamePlay = function() {
    var xo = prompt("Would you like to be X or O?");
    selectLetter(xo);
    console.log("Okay! You chose " + user + ". Let's roll the virtual die to see who goes first...");
    if (firstMove() == "Computer") {
        console.log("Shucks. The computer goes first. Off to a rough start :-/ Oh well, have a good game!");
    }
    else {
        console.log("Oh, hooray! You get to go first. Off to a lucky start, I see. Have a good game!");
    }

    do {
        console.log(turn + "'s turn.");
        if (turn == "Computer") {
          spaces[computerMove()] = computer;
          printBoard();
          if (gameWon(spaces, computer) === true) {
              break;
          }
          turn = "User";
        }
        else if (turn == "User") {
          getUserMove();
          printBoard();
          if (gameWon(spaces, user) === true) {
              break;
          }
          turn = "Computer";
        }
    }
    while (boardFull() === false);

    
    if (winner == computer) {
        console.log("Game over! The computer won. Don't feel too bad, though—-the computer doesn't make mistakes, unlike us inferior humans.");
    }
    else if (winner == user) {
        console.log("Game over! Woah! You won! That's pretty impressive for playing against an entity that doesn't make mistakes.");
    }
    else {
        console.log("Game over! Nobody won. Well, you're as good at this as the computer. Kinda boring to be so perfectly matched though, right? ;-)");
    }
    
    playAgain();
};


var ticTacToe = function(){
    console.log("Howdy. Let's play tic-tac-toe! Each square will have a number 1-9 assigned to it, like this:");
    console.log(" 1 | 2 | 3 ");
    console.log("---|---|---");
    console.log(" 4 | 5 | 6 ");
    console.log("---|---|---");
    console.log(" 7 | 8 | 9 ");
    console.log("You'll use these numbers to make your moves.");
    gamePlay();
}


ticTacToe();