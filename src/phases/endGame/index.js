import endGameView from "./view";
import './style.css'

export default async function (winnerName) {
  const view = endGameView(winnerName);
  await view.showMessage();
  const playAgainButton = await view.drawPlayAgain();
  
  console.log('yho')

  await new Promise((resolve) => {
    playAgainButton.onclick = resolve;
  });

  console.log('hey')
  await view.hidePlayAgain();
  view.clear();
}
