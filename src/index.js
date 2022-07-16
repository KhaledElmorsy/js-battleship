import './style.css'
import phases from './phases';


phases.newGame()
  .then(phases.setUpPlayers)
  .then(console.log)
