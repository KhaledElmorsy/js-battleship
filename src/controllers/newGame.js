import { elements } from '../templates'

export default async function newGame() {
  const container = document.getElementById('hud');
  const newGameElement = elements.newGame;
  container.appendChild(newGameElement);
  
  const nameInput = document.getElementById('name-input');
  const startButton = document.getElementById('start-button');

  let playerName = new Promise((resolve,reject) => {
    startButton.onclick = () => {
      container.removeChild(newGameElement) 
      resolve(nameInput.value)
    }
  });

  return await playerName; 
}
