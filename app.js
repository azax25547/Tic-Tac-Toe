//Game Object
var game = {
  isClicked: false,
  crossGame: `<i class='fa fa-times'></i>`,
  roundGame: `<i class='far fa-circle'></i>`,
  cross: [],
  round: [],
  winning_array: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ],
};
// variables
var output = document.getElementById("output");
var refreshButton = document.getElementById("refresh");
var resultButton = document.getElementById("result");

let gameType = document.getElementById("gameType");

let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let playerOne = document.getElementById("player");
let playerTurn = document.querySelector(".player-turn");
let player1name = document.querySelector(".player-1-name");
let player2name = document.querySelector(".player-2-name");
let player1Score = document.querySelector(".player-1-score");
let player2Score = document.querySelector(".player-2-score");

let count = 1;
let changeTurn = false;
let player1s = 0;
let player2s = 0;

function selectGame() {
  if (gameType.value === "1") {
    document.getElementById("start").style.display = "block";
    document.getElementById("pvp").style.display = "block";
    document.getElementById("pai").style.display = "none";

    //start for pvp
  } else if (gameType.value === "2") {
    document.getElementById("pai").style.display = "block";
    document.getElementById("pvp").style.display = "none";
  } else {
    alert(
      "Please select either Player vs Player or With AI from the dropdown."
    );
  }
}

function startGame() {
  if (player1.value && player2.value) {
    document.querySelector(".grid-container").style.display = "block";
    document.getElementById("start").disabled = true;
    player1.disabled = true;
    player2.disabled = true;
    gameType.disabled = true;
    document.getElementById("selectGame").disabled = true;
    player1name.innerHTML = player1.value;
    player2name.innerHTML = player2.value;
    playerTurn.innerHTML = `${player1.value}'s turn (${game.crossGame}).`;
    document.querySelector(".name").style.display = "block";
  } else if (playerOne.value || !playerOne.value) {
    alert("Support for AI will come very soon.!!");
  } else alert("Please fill Player1 and Player2 details correctly.");
}

function playAgain() {
  changeTurn = !changeTurn;
  document.getElementById("outGrid").classList.remove("disable");
  const allSquares = document.querySelectorAll(".inner-square");
  for (let i = 0; i < allSquares.length; i++) {
    allSquares[i].setAttribute("onclick", "takeTheInput(this)");
    allSquares[i].innerHTML = "";
    allSquares[i].style.background = "";
  }
  //reset game controls
  game.round = [];
  game.cross = [];
  game.isClicked = false;

  result.innerHTML = "";
  refreshButton.style.display = "none";
  document.getElementById("again").style.display = "none";

  playerTurn.innerHTML = changeTurn
    ? `${player2.value}'s turn (${game.roundGame}).`
    : `${player1.value}'s turn (${game.crossGame}).`;
}

//get crosses and rounds from the user
function getData(data, which_game, player) {
  var box = data.getAttribute("data-box");
  //console.log(box);
  //switch between clicks
  if (!game.isClicked) {
    game.cross.push(box);
  } else if (game.isClicked) {
    game.round.push(box);
  }
  //once clicked you cant click. So to disable the click
  data.removeAttribute("onclick");
  checkMoves(which_game, player);
}

//simlutaneously display the click result and then operate it
function takeTheInput(data) {
  if (!changeTurn) {
    if (!game.isClicked) {
      data.innerHTML = game.crossGame;
      playerTurn.innerHTML = changeTurn
        ? `${player1.value}'s turn (${game.crossGame}).`
        : `${player2.value}'s turn (${game.roundGame}).`;
      getData(data, game.cross, player1.value);
      game.isClicked = !game.isClicked;
    } else if (game.isClicked) {
      data.innerHTML = game.roundGame;
      playerTurn.innerHTML = changeTurn
        ? `${player2.value}'s turn (${game.roundGame}).`
        : `${player1.value}'s turn (${game.crossGame}).`;
      getData(data, game.round, player2.value);
      game.isClicked = !game.isClicked;
    }
  } else {
    if (!game.isClicked) {
      data.innerHTML = game.roundGame;
      playerTurn.innerHTML = changeTurn
        ? `${player1.value}'s turn (${game.crossGame}).`
        : `${player2.value}'s turn (${game.roundGame}).`;
      getData(data, game.cross, changeTurn ? player2.value : player1.value);
      game.isClicked = !game.isClicked;
    } else if (game.isClicked) {
      data.innerHTML = game.crossGame;
      playerTurn.innerHTML = changeTurn
        ? `${player2.value}'s turn (${game.roundGame}).`
        : `${player1.value}'s turn (${game.crossGame}).`;
      getData(data, game.round, changeTurn ? player1.value : player2.value);
      game.isClicked = !game.isClicked;
    }
  }
}

function updateScorecard(oneWins) {
  if (oneWins === 1) {
    player1s += 1;
  } else {
    player2s += 1;
  }
  player1Score.innerHTML = player1s;
  player2Score.innerHTML = player2s;
}

//check every move and finnaly declare the winner
function checkMoves(arr, player) {
  var comp = arr.map((val) => parseInt(val, 10)).sort();
  for (var i = 0; i < game.winning_array.length; i++) {
    if (
      comp.includes(game.winning_array[i][0]) &&
      comp.includes(game.winning_array[i][1]) &&
      comp.includes(game.winning_array[i][2])
    ) {
      document.getElementById("outGrid").classList.add("disable");
      if (player == player1.value) updateScorecard(1);
      else updateScorecard(0);
      result.innerHTML = `${player} wins the Game.<br/> Wants to Play Again <br/>`;
      refreshButton.style.display = "block";
      document.getElementById("again").style.display = "block";
      playerTurn.innerHTML = "";
      game.winning_array[i].forEach((item) => {
        document
          .querySelector(`div[data-box="${item}"]`)
          .classList.add("color-box");
      });
      return;
    }
  }
  if (game.cross.length + game.round.length == 9) {
    result.innerHTML = `Game Draw`;
    refreshButton.style.display = "block";
    document.getElementById("again").style.display = "block";
    playerTurn.innerHTML = "";
  }
}
