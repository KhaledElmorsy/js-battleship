import Player from '../src/player';
import Gameboard from '../src/gameboard';
import Ship from '../src/ship';

jest.mock('../src/ship')
jest.mock('../src/gameboard');

let playerData;
let testPlayer;
beforeAll(() => {
  playerData = {
    name: 'Test',
    isPC: false,
    gameboard: new Gameboard(),
    ships: Array.from([1,2], len => new Ship(len))
  }
  testPlayer = new Player(playerData)
});

describe('Constructor', () => {
  it('sets name', () => {
    expect(testPlayer.name).toBe('Test');
  });
  it('sets isPC', () => {
    expect(testPlayer.isPC).toBe(false);
  });
  it('stores gameboard object', () => {
    expect(testPlayer.board).toBe(playerData.gameboard);
  });
  it('sets the ship array', () => {
    expect(testPlayer.ships).toBe(playerData.ships);
  });
  it('sets \'lost\' property to false', () => {
    expect(testPlayer.lost).toBe(false);
  });
});

describe('Methods:', () => {
  describe('attack():', () => {
    let enemyData;
    let testEnemy;
    beforeEach(() => {
      enemyData = {
        name: 'enemy',
        isPC: false,
        gameboard: new Gameboard(),
        ships: Array.from([2, 2], (len) => new Ship(len)),
      };
      testEnemy = new Player(enemyData);
    });
    it('calls the enemy\'s gameboard\'s receiveAttack()', () => {
      testPlayer.attack(testEnemy, 0,0);
      expect(testEnemy.board.receiveAttack.mock.calls.length).toBe(1);
    });
    it('returns the ship object that receiveAttack() returns', () => {
      testEnemy.board.receiveAttack = jest.fn(() => 'ship');
      expect(testPlayer.attack(testEnemy, 0, 0)).toBe('ship');
    });
  });
  describe('checkLost():', () => {
    it('returns true if all the player\'s ships are sunk', () => {
      testPlayer.ships.forEach((ship) => ship.isSunk = true);
      expect(testPlayer.checkLost()).toBe(true);
    });
    it('sets \'lost\' property to true, if the player lose', () => {
      const mockSunkShips = [new Ship(2), new Ship(2)];
      testPlayer.ships.forEach((ship) => ship.isSunk = true);
      testPlayer.checkLost();
      expect(testPlayer.lost).toBe(true);
    });
    it('returns false if one of the ships isnt sunk', () => {
      testPlayer.ships[0].isSunk = true;
      testPlayer.ships[1].isSunk = false;
      expect(testPlayer.checkLost()).toBe(false);
    });
  describe('createPlayerList():', () => {
    it('creates an array of player objects that match the input data', () => {
      const playerList = [
        {name: 'Test1', isPC: false },
        {name: 'Test2', isPC: true }
      ];
      const shipLengths = [2, 3, 4];

      const players = Player.createPlayers({
        playerList,
        shipLengths,
        Gameboard,
        Ship
      });

      const actualPlayer1 = new Player({
        name: players[0].name,
        isPC: players[0].isPC,
        gameboard: new Gameboard(),
        ships: Array.from(shipLengths, (len) => new Ship(len))
      })

      const actualPlayer2 = new Player({
        name: players[1].name,
        isPC: players[1].isPC,
        gameboard: new Gameboard(),
        ships: Array.from(shipLengths, (len) => new Ship(len))
      });
      expect(JSON.stringify(players[0])).toEqual(JSON.stringify(actualPlayer1));
      expect(JSON.stringify(players[1])).toEqual(JSON.stringify(actualPlayer2));
      expect(playerList.length).toBe(2);
    })
  })
  })
})
