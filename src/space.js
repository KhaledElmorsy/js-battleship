/**
 * A space on the board. The space can be hit, changing its property.
 */
export default class Space {
  constructor() {
    /**@type {boolean}*/
    this.isHit = false;
  }

  /** Changes the space's isHit property to 'true' */
  hit() {
    this.isHit = true;
  }
}
