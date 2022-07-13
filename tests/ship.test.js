import Space from '../src/space';
import Ship from '../src/ship';

let testShip;

beforeEach(() => {
  testShip = new Ship(3);
});

describe('Constructor', () => {
  it('creates the hits array with the proper length', () => {
    expect(testShip.hits.length).toBe(3);
  });
  it('creates a array of space objects', () => {
    const nonSpaces = testShip.hits
      .map((val) => val instanceof Space)
      .includes(false);
    expect(nonSpaces).toBe(false);
  });
  it('assigns itself as space\'s parent', () => {
    expect(testShip.hits[0].parent).toBe(testShip);
  });
});

describe('Methods:', () => {
  describe('isSunk():', () => {
    it('returns false if the hit array contains at least one false', () => {
      testShip.hits[0].hit();
      expect(testShip.isSunk()).toBe(false);
    });
    it('returns true if the hit array is all true', () => {
      testShip.hits[0].hit();
      testShip.hits[1].hit();
      testShip.hits[2].hit();
      expect(testShip.isSunk()).toBe(true);
    });
  });
});
