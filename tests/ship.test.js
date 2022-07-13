import Ship from '../src/ship';

describe('Test that the constructor', () => {
  it('creates a hit array', () => {
    expect(new Ship(3).hits).toEqual([false, false, false]);
  });
});

describe('Methods:', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  describe('Test that hit()', () => {
    it('switches value to true at hit location', () => {
      ship.hit(2);
      expect(ship.hits[2]).toBe(true);
    });
  });

  describe('Test that isSunk()', () => {
    it('returns false if the hit array contains at least one false', () => {
      ship.hit(2);
      ship.hit(0);
      expect(ship.isSunk()).toBe(false);
    });
    it('returns true if the hit array is all true', () => {
      ship.hit(0);
      ship.hit(1);
      ship.hit(2);
      expect(ship.isSunk()).toBe(true);
    });
  });
});
