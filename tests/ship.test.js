import Space from '../src/space';
import Ship from '../src/ship';

describe('Test that the constructor', () => {
  it('creates a array of space objects', () => {
    let space = new Space;
    expect(new Ship(3).hits).toEqual([space, space, space]);
  });
});

describe('Methods:', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  describe('Test that isSunk()', () => {
    it('returns false if the hit array contains at least one false', () => {
      ship.hits[0].hit();
      expect(ship.isSunk()).toBe(false);
    });
    it('returns true if the hit array is all true', () => {
      ship.hits[0].hit();
      ship.hits[1].hit();
      ship.hits[2].hit();
      expect(ship.isSunk()).toBe(true);
    });
  });
});
