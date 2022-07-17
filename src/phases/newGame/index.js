import view from './view';
import './style.css'

export default async function newGame() {
  view.show();

  let playerName = new Promise((resolve, reject) => {
    function resolveName() {
      const inputValue = view.input.value;
      if (inputValue.length > 0) {
        view.hide();
        resolve(inputValue);
      }
    }

    view.input.onkeydown = (e) => {
      if (e.key === 'Enter') resolveName();
    };

    view.startButton.onclick = () => resolveName();
  });

  return await playerName;
}
