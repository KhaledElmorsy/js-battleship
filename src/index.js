import './style.css'
import phases from './phases';


phases.newGame()
  .then(phases.setUpPlayers)
  .then(phases.drawBoard)
  .then(phases.placeShips)
  .then(console.log)
