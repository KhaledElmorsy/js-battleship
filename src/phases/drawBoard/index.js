import boardView from './view';
import './style.css'

export default async function (players) {
  players.forEach((player, i) => {
    /** @type {boardView} */
    player.boardView = boardView(player, i);
    player.boardView.show();
  })

  return players
}
