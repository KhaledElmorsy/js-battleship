import Gameboard from './gameboard';
import Ship from './ship';

/**
 * Main player class that consolidates their gameboard, ships, and actions.
 *
 * Players can be human or a PC, but commanding the PC is handled by the game instance.
 *
 * Players handle placing the ship array onto their gameboard and can attack an
 * enemy gameboard object. Turns and which board to attack are handled by the game.
 */
export default class Player {
  /**
   * @param {Object} playerData Object containing needed data to create a new player
   * @param {string} playerData.name Player's name
   * @param {boolean} playerData.isPC Wheter the player's PC or a human
   * @param {Gameboard} playerData.gameboard The player's gameboard object
   * @param {Ship[]} playerData.ships The player's array of ships
   */
  constructor(playerData) {
    /**@type {string} */
    this.name = playerData.name;
    
    /**@type {boolean} */
    this.isPC = playerData.isPC;

    /**@type {Gameboard} */
    this.board = playerData.gameboard;

    /**@type {Ship[]} */
    this.ships = playerData.ships;

    /**@type {boolean} */
    this.lost = false;
  }

  /**
   * Trigger an enemy's board's receiveAttack() function on a specific space.
   * @param {Player} enemyPlayer Enemy player to attack
   * @param {number} col Index in board's inner array < 15
   * @param {number} row Index in board's outer array < 15
   * @return {Ship|undefined} If a ship was hit, return that ship, otherwise return undefined.
   */
  attack(enemyPlayer, col, row) {
    return enemyPlayer.board.receiveAttack(col, row);
  }

  /**
   * Checks if all the player's ships have sank, and sets their **lost** property 
   * to true and returns it. Otherwise returns false.
   * @returns {boolean}
   */
  checkLost() {
    this.lost = this.ships.reduce((res, ship) => ship.isSunk && res, true);
    return this.lost;
  }
}
