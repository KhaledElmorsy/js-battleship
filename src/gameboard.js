import Space from './space';

/**
 * Gameborads have a 2D array of space objects and can store ships by 
 * referencing array positions to the ships' own space objects.
 * 
 * It also checks if a new ship's position is viable according to the board's state.
 * and handles hitting a space in its array. 
 */
export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 15 }, () =>
      Array.from({ length: 15 }, () => new Space())
    );
  }
  /**
   * Iterates over positions in the 2D array from an origin coordinate and sets
   * makes them reference the space objects in the ship's hit array. 
   * 
   * Board: [E][E][E]. Ship: [A][B][C] ==> Board: [A][B][C]
   * 
   * @param {number} col The origin's index at the inner array - Must be < 15
   * @param {number} row The origin's index at the outer array - Must be < 15
   * @param {boolean} horizontal True: Increment to the right. False: Increment down
   * @param {Ship} ship The ship object to assign the space references from
   */
  placeShip(col, row, horizontal, ship) {
    ship.hits.forEach((space, i) => {
      this.board[row + (!horizontal && i)][col + (horizontal && i)] = space;
    });
  }

  /**
   * Checks if an input ship can be placed on the game board at the passed coordinates and orientation by checking that:
   * - Its spaces are within the board
   * - None of its spaces overlap with another ship's spaces
   * - None of its spaces neighbor another ships' vertically, horizontally, or 
   * diagonally
   * 
   * Returns **false** if any of the rules aren't satisfied. Otherwise returns **true**.
   * 
   * @param {number} col Index of the origin at the outer array - Must be < 15
   * @param {number} row Index of the origin at the inner array - Must be < 15
   * @param {boolean} horizontal True: Increment to the right. False: Increment down
   * @param {Ship} ship The new ship object to try to place
   * @returns {boolean}
   */
  canPlace(col, row, horizontal, ship) {
    const maxRow = row + (!horizontal && ship.hits.length);
    const maxCol = col + (horizontal && ship.hits.length);
    if (maxCol > 14 || maxRow > 14) return false;

    const board = this.board;
    for (let i = 0; i < ship.hits.length; i++) {
      const currentRow = row + (!horizontal && i);
      const currentCol = col + (horizontal && i);

      if (board[currentRow][currentCol].parent) return false;

      for (let offset of [-1, 1]) {
        if (board[currentRow + offset]?.[currentCol].parent) return false;
        if (board[currentRow][currentCol + offset]?.parent) return false;
        if (board[currentRow + offset]?.[currentCol + offset]?.parent) return false;
        if (board[currentRow + offset]?.[currentCol - offset]?.parent) return false;
      }
    }
    return true;
  }
  
  /**
   * Calls a space's hit function
   * @param {number} col Index of the inner array (< 15)
   * @param {number} row Index of the outer array (< 15)
   * @return {Ship|undefined} - Parent of the hit space
   */
  attack(col, row) {
    this.board[row][col].hit();
    return this.board[row][col].parent;
  }

  /**
   * Returns the hit state of a space.
   * @param {number} col Index of the inner array (< 15)
   * @param {number} row Index of the outer array (< 15)
   * @returns {boolean}
   */
  checkHit(col, row) {
    return this.board[row][col].isHit
  }
}