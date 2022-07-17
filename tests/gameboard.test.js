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
      it('returns an object containing index coords and orientation', () => {
        const position = testBoard.findValidPosition(testShip1);
        expect(typeof position.col).toBe('number');
        expect(typeof position.row).toBe('number');
        expect(typeof position.horizontal).toBe('boolean');
      });
      it('returns a position that can be placed on the board', () => {
        const longShip = new Ship(13);
        const longShipPos = { col: 7, row: 0, horizontal: false };
        testBoard.placeShip(longShipPos, longShip);
        
        const crossShip1 = new Ship(7);
        const crossShip1Pos = { col: 0, row: 4, horizontal: true };
        const crossShip2 = new Ship(7);
        const crossShip2pos = { col: 8, row: 4, horizontal: true };
        testBoard.placeShip(crossShip1Pos, crossShip1);
        testBoard.placeShip(crossShip2pos, crossShip2);

        const testShip = new Ship(15);
        const testPosition = testBoard.findValidPosition(testShip);
        expect(testBoard.canPlace(testPosition,testShip)).toBe(true);
        expect(testPosition).toEqual({ col: 0, row: 14, horizontal: true });
      });
      it('returns null if it can\'t find a valid position', () => {
        const invalidShip = new Ship(16);
        expect(testBoard.findValidPosition(invalidShip)).toBe(null)
      })
    });
    describe('autoPlaceShips():', () => {
      it('calls placeShip() for each valid ship in the ship array', () => {
        const shipQuantity = 8;
        const shipArray = Array.from({length: shipQuantity}, () => new Ship(2));
        testBoard.placeShip = jest.fn();
        testBoard.autoPlaceShips(shipArray);
        expect(testBoard.placeShip.mock.calls.length).toBe(shipQuantity);
      });
      it('returns true if all ships were placed', () => {
        const shipArray = Array.from({length: 3}, () => new Ship(2));
        expect(testBoard.autoPlaceShips(shipArray)).toBe(true);
      });
      describe('handles failed placements:', () => {
        let shipArray;
        beforeAll(() => {
          shipArray = Array.from({length: 3}, () => new Ship(2));
          shipArray.push(new Ship(16));
        });
        it('returns false if it failed to place a ship', () => {
          expect(testBoard.autoPlaceShips(shipArray)).toBe(false);
        });
        it('restores the gameboard if it fails to place a ship', () => {
          const originalBoard = { ...testBoard.board };
          testBoard.autoPlaceShips(shipArray);
          expect(testBoard.board).toEqual(originalBoard);
        });
      });
    })
    describe('resetBoard():' , () => {
      it('removes placed ships', () => {
        const position = { col: 0, row: 0, horizontal: true };
        testBoard.placeShip(position,testShip1);
        testBoard.resetBoard();
        expect(testBoard.board[0][0].parent).toBe(undefined);
      });
    });
  });
  describe('receiveAttack():', () => {
    it('calls the correct space\'s hit function', () => {
      testBoard.board[0][0].hit = jest.fn();
      testBoard.receiveAttack(0,0);
      expect(testBoard.board[0][0].hit).toHaveBeenCalled();
    });
    it('returns the attacked space\'s parent', () => {
      const testShip = new Ship(3);
      const position = { col: 0, row: 0, horizontal: true }
      testBoard.placeShip(position, testShip);
      expect(testBoard.receiveAttack(0,0)).toBe(testShip);
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
