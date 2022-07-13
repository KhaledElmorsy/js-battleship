/**
 * A space on the board. The space can be hit, changing its property.
 */
export default class Space {
  constructor(parent = undefined) {
    /**@type {boolean}*/
    this.isHit = false;
    /**@type {Object} */
    this.parent = parent;
  }

  /** Changes the space's isHit property to 'true' */
  hit() {
    this.isHit = true;
  }
}
