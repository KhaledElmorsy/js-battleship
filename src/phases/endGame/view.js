import { createElement, timeout, waitTransitions } from '../viewHelpers';

export default function view(winnerName) {
  const container = document.getElementById('hud');
  const winnerMessage = createElement(
    `<div id="winner-message">${winnerName} won!</div>`
  );
  const playAgain = createElement(
    '<div id="play-again" class="button">Play again</div>'
  )

  async function showMessage() {
    winnerMessage.classList.add('hide');
    container.append(winnerMessage);
    await timeout(0)
    await waitTransitions('hide', true, winnerMessage);
    await timeout(2000);
    await waitTransitions('hide', false, winnerMessage);
    winnerMessage.remove();
  }

  async function drawPlayAgain(){
    console.log(1);
    playAgain.classList.add('hide');
    console.log(2)
    container.append(playAgain);
    console.log(3);
    await timeout(0);
    await waitTransitions('hide', true, playAgain);
    console.log('what');
    return playAgain;
  }

  async function hidePlayAgain() {
    await waitTransitions('hide', false, playAgain);
    playAgain.remove();
  }

  function clear() {
    container.innerHTML = '';
    document.getElementById('play-area').innerHTML = '';
  }

return { showMessage, drawPlayAgain, hidePlayAgain, clear }

}
