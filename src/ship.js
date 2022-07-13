import Space from './space';
/**
 * Create a new ship with an array representing if its sections have been hit,
 * and methods to simulate hits and check if all parts of the ship have been hit,
 * i.e. the ship has sunk.
 */
export default class Ship {
  /**
   * @param {number} shipLength The length of the array representing the ship. Should be greater than 0.
   */
  constructor(shipLength) {
    this.hits = Array.from({ length: shipLength }, () => new Space(this));
  }

  /**
   * Checks if the ship has sunk or not by checking the hit array. If the hit
   * array values are all true, return true, if there's at least one false,
   * return false.
   * @returns {boolean}
   */
  isSunk() {
    return !this.hits.find((space) => !space.isHit);
  }
}
