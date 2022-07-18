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
   * Create an array of player instances from an array of basic player info objects 
   * and based on a common set of ship lengths.
   * 
   * The Gameboard and Ship classes that'll be used to instantiate their boards
   * and ships need to be injected. 
   * @param {Object} data Player info arrays and dependencies
   * @param {{name: string, isPC: boolean}[]} data.playerList Array of objects with each player's name and whether they're a PC
   * @param {number[]} data.shipLengths Array containing the lengths of each ship to instantiate. Must have at least one value
   * @param {typeof Gameboard} data.Gameboard Base gameboard class to instantiate for each player
   * @param {typeof Ship} data.Ship Base Ship class to instatiate for each player
   * @returns {Player[]} Array of players
   */
  static createPlayers(data) {
    const players = [];
    data.playerList.forEach((player) => {
      players.push(
        new Player({
          name: player.name,
          isPC: player.isPC,
          gameboard: new data.Gameboard(),
          ships: Array.from(data.shipLengths, (len) => new data.Ship(len)),
        })
      );
    });
    return players;
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
