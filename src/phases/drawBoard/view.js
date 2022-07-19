import board from './templates/board';

/**
 *
 * @param {import('../../player').default} player
 * @param {*} index
 * @returns
 */
export default function view(player, index) {
  const container = document.getElementById('play-area');
  const boardElement = board(player, index);
  const spaceElements = [...boardElement.children] 

  function show() {
    container.append(boardElement);
  }

  function hide() {
    container.removeChild(boardElement);
  }

  function getIndices(spaceElement) {
    return {
      col: parseInt(spaceElement.getAttribute('data-col'), 10),
      row: parseInt(spaceElement.getAttribute('data-row'), 10),
    }
  }

  function update() {
    spaceElements.forEach((spaceElement) => {
      const { col, row } = getIndices(spaceElement);
      if (player.board.board[row][col].isHit)
        spaceElement.classList.add('hit');

      if (player.board.board[row][col].parent) {
        spaceElement.classList.add('ship');
      }
      else spaceElement.classList.remove('ship');
    });
  }

  function highlight(position, ship, isValidPosition) {
    const className = isValidPosition? 'valid' : 'invalid';
    const shiplength = ship.hits.length;
    const lastShipCol = position.col + (shiplength-1) * position.horizontal;
    const lastShipRow = position.row + (shiplength-1) * !position.horizontal;
    
    spaceElements.forEach((spaceElement) => {
      const { col, row } = getIndices(spaceElement);
      const withinCol = col >= position.col && col <= lastShipCol;
      const withinRow = row >= position.row && row <= lastShipRow;
      if(withinCol && withinRow) spaceElement.classList.add(className);
    })
  }

  function unhighlightAll() {
    spaceElements.forEach((spaceElement) => {
      spaceElement.classList.remove('valid');
      spaceElement.classList.remove('invalid');
    })
  }

  return { show, hide, update, spaceElements, getIndices, highlight, unhighlightAll };
}
