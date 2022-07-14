import Gameboard from '../src/gameboard';
import Space from '../src/space';
import Ship from '../src/ship';

let testBoard;
beforeEach(() => {
  testBoard = new Gameboard();
});

describe('Constructor', () => {
  it('creates a 15x15 2D Array "board" ', () => {
    expect(testBoard.board.length).toBe(15);
    expect(testBoard.board[0].length).toBe(15);
  });

  it('sets each value in the board array as a Space object', () => {
    const allSpaceObjs = testBoard.board
      .map((row) => row.some((val) => !(val instanceof Space)))
      .includes(true);
    expect(allSpaceObjs).toBe(false);
  });
});

describe('Methods:', () => {
  describe('Ship placement:', () => {
    let testShip1;

    beforeEach(() => {
      testShip1 = new Ship(3);
    });

    describe('placeShip():', () => {
      it('sets array positions to reference ships space objects - horizontal', () => {
        const position = { col: 0, row: 0, horizontal: true };
        testBoard.placeShip(position, testShip1);
        expect(testBoard.board[0][0]).toBe(testShip1.hits[0]);
        expect(testBoard.board[0][1]).toBe(testShip1.hits[1]);
        expect(testBoard.board[0][2]).toBe(testShip1.hits[2]);
      });
      it('sets array positions to reference ships space objects - vertical', () => {
        const position = { col: 0, row: 0, horizontal: false };
        testBoard.placeShip(position, testShip1);
        expect(testBoard.board[0][0]).toBe(testShip1.hits[0]);
        expect(testBoard.board[1][0]).toBe(testShip1.hits[1]);
        expect(testBoard.board[2][0]).toBe(testShip1.hits[2]);
      });
    });
    describe('canPlace():', () => {
      it('returns false if out of bounds', () => {
        const outofBoundsRight = { col: 13, row: 0, horizontal: true };
        const outofBoundsBottom = { col: 0, row: 14, horizontal: false };
        expect(testBoard.canPlace(outofBoundsRight, testShip1)).toBe(false);
        expect(testBoard.canPlace(outofBoundsBottom, testShip1)).toBe(false);
      });
      it('returns true if within bounds', () => {
        const inBoundsHoriz = { col: 0, row: 0, horizontal: true };
        const inBoundsVertical = { col: 0, row: 0, horizontal: false };
        expect(testBoard.canPlace(inBoundsHoriz, testShip1)).toBe(true);
        expect(testBoard.canPlace(inBoundsVertical, testShip1)).toBe(true);
      });

      describe('checks against already placed ships:', () => {
        let testShip2;
        beforeEach(() => {
          const ship1Position = { col: 5, row: 5, horizontal: true };
          testBoard.placeShip(ship1Position, testShip1);
          
          testShip2 = new Ship(3);
        });

        it('returns false if new ship overlaps with others', () => {
          const testPosition = { col: 5, row: 5, horizontal: true }
          expect(testBoard.canPlace(testPosition, testShip2)).toBe(false);
        });
        it('returns false if ships are touching veritcally', () => {
          const testPosition = { col: 5, row: 6, horizontal: true }
          expect(testBoard.canPlace(testPosition, testShip2)).toBe(false);
        });
        it('returns false if ships are toughing horizontally', () => {
          const testPosition = { col: 4, row: 5, horizontal: true }
          expect(testBoard.canPlace(testPosition, testShip2)).toBe(false);
        });
        it('returns false if ships are touching diagonally', () => {
          const testPosition = { col: 4, row: 6, horizontal: true }
          expect(testBoard.canPlace(testPosition, testShip2)).toBe(false);
        });
      });
    });
    describe('findValidPosition()', () => {
      it('accepts a ship obj, and returns index coords and orientation', () => {
        const position = testBoard.findValidPosition(testShip1);
        expect(typeof position.col).toBe('number');
        expect(typeof position.row).toBe('number');
        expect(typeof position.horizontal).toBe('boolean');
      });
    })
  });
  describe('attack():', () => {
    it('calls the correct space\'s hit function', () => {
      testBoard.board[0][0].hit = jest.fn();
      testBoard.attack(0,0);
      expect(testBoard.board[0][0].hit).toHaveBeenCalled();
    });
    it('returns the attacked space\'s parent', () => {
      const testShip = new Ship(3);
      const position = { col: 0, row: 0, horizontal: true }
      testBoard.placeShip(position, testShip);
      expect(testBoard.attack(0,0)).toBe(testShip);
    });
  });
  describe('checkHit():', () => {
    it('returns true if the space was hit', () => {
      testBoard.board[0][0].isHit = true;
      expect(testBoard.checkHit(0,0)).toBe(true);
    });
    it('returns false if the space wasn\'t hit', () => {
      testBoard.board[0][0].isHit = true;
      expect(testBoard.checkHit(1,1)).toBe(false);
    });
  });
});
