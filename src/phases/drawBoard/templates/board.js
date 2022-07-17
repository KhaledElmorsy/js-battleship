import Player from '../../../player';
import { createElement } from '../../viewHelpers';

/**
 *
 * @param {Player} player
 */
export default function board(player, playerListIndex) {
  let elementHTML = '';
  const gameboard = player.board;
  gameboard.board.forEach(
    (row, i) => row.forEach(
      (cell, j) => {
        const shipClass = cell.parent ? 'ship' : '';
        elementHTML += `<div class="space ${shipClass}" data-row="${i}" data-col="${j}"></div>`
      }
    )
  );
  const wrapper = createElement(elementHTML);
  wrapper.classList.add('board');
  wrapper.setAttribute('data-player', playerListIndex);
  return wrapper;
}
