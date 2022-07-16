import './style.css'
import Ship from './ship';
import Gameboard from './gameboard';
import Player from './player';
import board from './templates/generators/board';
import newGame from './controllers/newGame';

const players = [
  {name: 'Khaled', isPC: false},
  {name: 'Enemy', isPC: true},
];
const shipLengths = [2,2,2,3, 3, 4, 4, 5, 6];

const playerList = Player.createPlayerList({
  players,
  shipLengths,
  Gameboard,
  Ship
});

const playArea = document.getElementById('play-area');

newGame().then(res => console.log(res));

playerList.forEach((player, i) => {
  player.board.autoPlaceShips(player.ships);
  playArea.appendChild(board(player, i));
});

// Humans place ships

// computer autoplace



let turnCount = 0;
let currentPlayerIndex;
let row;
let col;
let enemy;
// do {
//   currentPlayerIndex = turnCount % playerList.length;
//   // col = prompt('Column: ');
//   // row = prompt('Row: ');
//   // enemy = prompt('Enemy Index: ')
//   // // let spaceParent = playerList[currentPlayerIndex].attack(playerList[enemy], col, row);
//   // if (spaceParent) console.log(spaceParent.checkSunk());
//   // console.log(playerList[1].board.board)
//   // turnCount++
// } while(playerList.filter((player) => !player.lost).length > 1);
