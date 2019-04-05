var game = {
  isClicked: false,
  crossGame: "X",
  roundGame: "O",
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
    [3, 5, 7]
  ]
};

function getData(data, which_game, player) {
  var box = data.getAttribute("data-box");
  //console.log(box);
  if (!game.isClicked) {
    game.cross.push(box);
  } else if (game.isClicked) {
    game.round.push(box);
  }
  data.removeAttribute("onclick");
  checkMoves(which_game, player);
}

function checkMoves(arr, player) {
  var comp = arr.map(val => parseInt(val, 10)).sort();
  // console.log(comp);
  for (var i = 0; i < game.winning_array.length; i++) {
    if (
      comp.includes(game.winning_array[i][0]) &&
      comp.includes(game.winning_array[i][1]) &&
      comp.includes(game.winning_array[i][2])
    ) {
      console.log("Wins", player);
    } else if (comp.length > 4) {
      console.log("Draw");
    }
  }
}

function getSomething(data) {
  if (!game.isClicked) {
    data.innerHTML = game.crossGame;
    getData(data, game.cross, game.crossGame);
    game.isClicked = !game.isClicked;
  } else if (game.isClicked) {
    data.innerHTML = game.roundGame;
    getData(data, game.round, game.roundGame);
    game.isClicked = !game.isClicked;
  }
}
