import './style.css';
import addShipView from './view';

export default async function placeShips(players) {
  const view = addShipView();
  const mainPlayer = players[0];
  const board = mainPlayer.board;
  const mainBoardView = mainPlayer.boardView;
  const spaceElements = mainBoardView.spaceElements;
  let horizontal = true;

  view.show();

  view.buttons.rotateButton.onclick = () => {
    horizontal = !horizontal;
    view.rotatePreivew();
  };

  function getPosition(space) {
    return {
      col: mainBoardView.getIndices(space).col,
      row: mainBoardView.getIndices(space).row,
      horizontal,
    };
  }
  function highlight(ship, space) {
    const position = getPosition(space);
    const isValidPosition = board.canPlace(position, ship);
    mainBoardView.highlight(position, ship, isValidPosition);
  }

  function resolvePosition(ship, space, resolve) {
    const position = getPosition(space, horizontal);
    const positionIsValid = board.canPlace(position, ship);
    if (positionIsValid) resolve(position);
  }

  async function getUserPosition(ship) {
    const position = await new Promise((resolve) => {
      view.updatePreviewLength(ship.hits.length);
      spaceElements.forEach((space) => {
        space.onmouseover = () => highlight(ship, space);
        space.onmouseleave = mainBoardView.unhighlightAll;
        space.onclick = () => {
          mainBoardView.unhighlightAll();
          resolvePosition(ship, space, resolve);
        }
      });
    });
    return position;
  }

  function removeSpaceListeners() {
    spaceElements.forEach((space) => {
      space.onmouseover = null;
      space.onmouseleave = null;
      space.onclick = null;
    });
  }   

  async function resetShips(resolve) {
    board.resetBoard();
    mainBoardView.update();
    await setShips();
    resolve();
  }
  
  let allShipsPlaced;

  async function setShips() {
    await new Promise(async (resolve) => {
      
      view.buttons.resetButton.onclick = () => resetShips(resolve);
      view.buttons.saveButton.classList.remove('ready');
      allShipsPlaced = false;

      for (const ship of mainPlayer.ships) {
        const position = await getUserPosition(ship);
        board.placeShip(position, ship);
        mainBoardView.update();
      }
    
      removeSpaceListeners();

      allShipsPlaced = true;
      view.buttons.saveButton.classList.add('ready');

      view.buttons.saveButton.onclick = () => {
        if (allShipsPlaced) resolve();
      };
    });
  }

  await setShips();
  await view.end();
  return players;
}
