import './style.css'
import phases from './phases';

async function playGame() {
  await phases.newGame()
  .then(phases.setUpPlayers)
  .then(phases.drawBoard)
  .then(phases.placeShips)
  .then(phases.battle)
  .then(phases.endGame)

  playGame();
}

playGame();
