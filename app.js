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
    [3, 5, 7]
  ]
};
//output variable
var output = document.getElementById("output");

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

//check every move and finnaly declare the winner
function checkMoves(arr, player) {
  var comp = arr.map(val => parseInt(val, 10)).sort();
  console.log(comp);
  for (var i = 0; i < game.winning_array.length; i++) {
    if (
      comp.includes(game.winning_array[i][0]) &&
      comp.includes(game.winning_array[i][1]) &&
      comp.includes(game.winning_array[i][2])
    ) {
      document.getElementById("outGrid").classList.add("disable");
      output.innerHTML = `${player} wins the Game.<br/> Refresh to play Again <br/> <button onclick=window.location.reload();>Refresh</button>`;
    }
  }
  if (game.cross.length + game.round.length == 9) {
    output.innerHTML = `Game Draw`;
  }
}

//after the game finishes the reload the browser
const reload = () => {
  window.location.reload;
};
