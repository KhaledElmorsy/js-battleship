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
        testBoard.placeShip(0, 0, true, testShip1);
        expect(testBoard.board[0][0]).toBe(testShip1.hits[0]);
        expect(testBoard.board[0][1]).toBe(testShip1.hits[1]);
        expect(testBoard.board[0][2]).toBe(testShip1.hits[2]);
      });
      it('sets array positions to reference ships space objects - vertical', () => {
        testBoard.placeShip(0, 0, false, testShip1);
        expect(testBoard.board[0][0]).toBe(testShip1.hits[0]);
        expect(testBoard.board[1][0]).toBe(testShip1.hits[1]);
        expect(testBoard.board[2][0]).toBe(testShip1.hits[2]);
      });
    });
    describe('canPlace():', () => {
      it('returns false if out of bounds', () => {
        expect(testBoard.canPlace(13, 0, true, testShip1)).toBe(false);
        expect(testBoard.canPlace(0, 14, false, testShip1)).toBe(false);
      });
      it('returns true if within bounds', () => {
        expect(testBoard.canPlace(0, 0, true, testShip1)).toBe(true);
        expect(testBoard.canPlace(0, 0, false, testShip1)).toBe(true);
      });

      describe('checks against already placed ships:', () => {
        let testShip2;
        beforeEach(() => {
          testBoard.placeShip(5, 5, true, testShip1);
          testShip2 = new Ship(3);
        });

        it('returns false if new ship overlaps with others', () => {
          expect(testBoard.canPlace(5, 5, true, testShip2)).toBe(false);
        });
        it('returns false if ships are touching veritcally', () => {
          expect(testBoard.canPlace(5, 6, true, testShip2)).toBe(false);
        });
        it('returns false if ships are toughing horizontally', () => {
          expect(testBoard.canPlace(4, 5, false, testShip2)).toBe(false);
        });
        it('returns false if ships are touching diagonally', () => {
          expect(testBoard.canPlace(4,6, false, testShip2)).toBe(false);
        });
      });
    });
  });
  describe('attack():', () => {
    it('calls the correct space\'s hit function', () => {
      testBoard.board[0][0].hit = jest.fn();
      testBoard.attack(0,0);
      expect(testBoard.board[0][0].hit).toHaveBeenCalled();
    });
    it('returns the attacked space\'s parent ship (if it was hit)', () => {
      const testShip = new Ship(3);
      testBoard.placeShip(0, 0, true, testShip);
      expect(testBoard.attack(0,0)).toBe(testShip);
    });
  })
  describe('checkHit():', () => {
    it('returns true if the space was hit', () => {
      testBoard.attack(0,0);
      expect(testBoard.checkHit(0,0)).toBe(true);
    });
    it('returns false if the space wasn\'t hit', () => {
      testBoard.attack(0,0);
      expect(testBoard.checkHit(1,1)).toBe(false);
    });
  });
});
