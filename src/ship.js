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
    this.hits = new Array();
    this.hits.length = shipLength;
    this.hits.fill(false);
  }

  /**
   * Simulate hitting a part of the ship by setting the coinciding value in the
   * hits array to 'true'
   * @param {number} location index in the hit array to convert
   */
  hit(location) {
    this.hits[location] = true;
  }

  /**
   * Checks if the ship has sunk or not by checking the hit array. If the hit 
   * array values are all true, return true, if there's at least one false, 
   * return false.
   * @returns {boolean}
   */
  isSunk() {
    return !this.hits.includes(false);
  }
}
