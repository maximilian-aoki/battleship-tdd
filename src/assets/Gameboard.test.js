import Gameboard from './Gameboard';

describe('Gameboard - placeShip', () => {
  test('instantiate 10x10 board', () => {
    const newBoard = new Gameboard(10);

    expect(newBoard.board).toEqual([
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
    ]);
    expect(newBoard.ships).toEqual([]);
  });

  test('instantiate 8x8 board', () => {
    const newBoard = new Gameboard(8);

    expect(newBoard.board).toEqual([
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
    ]);
    expect(newBoard.ships).toEqual([]);
  });

  test('place carrier vertically', () => {
    const newBoard = new Gameboard(10);
    newBoard.placeShip('v', [0, 0], 'carrier');

    expect(newBoard.board).toEqual([
      ['C', '', '', '', '', '', '', '', '', ''],
      ['C', '', '', '', '', '', '', '', '', ''],
      ['C', '', '', '', '', '', '', '', '', ''],
      ['C', '', '', '', '', '', '', '', '', ''],
      ['C', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
    ]);
    expect(newBoard.ships).toHaveLength(1);
  });

  test('place battleship horizontally', () => {
    const newBoard = new Gameboard(10);
    newBoard.placeShip('h', [2, 3], 'battleship');

    expect(newBoard.board).toEqual([
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', 'B', 'B', 'B', 'B', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
    ]);
    expect(newBoard.ships).toHaveLength(1);
  });

  test('place multiple boats in various orientations', () => {
    const newBoard = new Gameboard(10);
    newBoard.placeShip('h', [2, 3], 'submarine');
    newBoard.placeShip('v', [6, 6], 'destroyer');
    newBoard.placeShip('v', [6, 7], 'patrol');

    expect(newBoard.board).toEqual([
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', 'S', 'S', 'S', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', 'D', 'P', '', ''],
      ['', '', '', '', '', '', 'D', 'P', '', ''],
      ['', '', '', '', '', '', 'D', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
    ]);
    expect(newBoard.ships).toHaveLength(3);
  });

  test('place multiple boats close to edge', () => {
    const newBoard = new Gameboard(10);
    newBoard.placeShip('h', [0, 7], 'submarine');
    newBoard.placeShip('v', [7, 3], 'destroyer');
    newBoard.placeShip('v', [8, 9], 'patrol');

    expect(newBoard.board).toEqual([
      ['', '', '', '', '', '', '', 'S', 'S', 'S'],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', 'D', '', '', '', '', '', ''],
      ['', '', '', 'D', '', '', '', '', '', 'P'],
      ['', '', '', 'D', '', '', '', '', '', 'P'],
    ]);
    expect(newBoard.ships).toHaveLength(3);
  });

  test('disallow illegal vertical placement', () => {
    const newBoard = new Gameboard(10);
    expect(newBoard.placeShip('v', [8, 8], 'carrier')).toBe('illegal move');
    expect(newBoard.ships).toEqual([]);
  });

  test('disallow illegal horizontal placement', () => {
    const newBoard = new Gameboard(10);
    expect(newBoard.placeShip('h', [0, 8], 'battleship')).toBe('illegal move');
    expect(newBoard.ships).toEqual([]);
  });

  test('disallow overlapping placement', () => {
    const newBoard = new Gameboard(10);
    newBoard.placeShip('h', [2, 3], 'battleship');
    expect(newBoard.placeShip('v', [0, 4], 'carrier')).toBe('illegal move');

    expect(newBoard.board).toEqual([
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', 'B', 'B', 'B', 'B', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
    ]);
    expect(newBoard.ships).toHaveLength(1);
  });

  test('placed boats have correct symbol property', () => {
    const newBoard = new Gameboard(10);
    newBoard.placeShip('v', [0, 0], 'carrier');
    newBoard.placeShip('v', [0, 1], 'destroyer');

    expect(newBoard.ships[0].symbol).toBe('C');
    expect(newBoard.ships[1].symbol).toBe('D');
  });
});

describe('Gameboard - receiveAttack', () => {
  const newBoard = new Gameboard(10);
  newBoard.placeShip('v', [1, 1], 'carrier');
  newBoard.placeShip('h', [0, 2], 'battleship');
  newBoard.placeShip('v', [4, 9], 'destroyer');
  newBoard.placeShip('h', [4, 4], 'submarine');
  newBoard.placeShip('v', [8, 2], 'patrol');

  test('check full board set up properly', () => {
    expect(newBoard.board).toEqual([
      ['', '', 'B', 'B', 'B', 'B', '', '', '', ''],
      ['', 'C', '', '', '', '', '', '', '', ''],
      ['', 'C', '', '', '', '', '', '', '', ''],
      ['', 'C', '', '', '', '', '', '', '', ''],
      ['', 'C', '', '', 'S', 'S', 'S', '', '', 'D'],
      ['', 'C', '', '', '', '', '', '', '', 'D'],
      ['', '', '', '', '', '', '', '', '', 'D'],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', 'P', '', '', '', '', '', '', ''],
      ['', '', 'P', '', '', '', '', '', '', ''],
    ]);
    expect(newBoard.ships).toHaveLength(5);
  });

  test('missed shot on fresh board', () => {
    newBoard.receiveAttack([2, 3]);

    expect(newBoard.board).toEqual([
      ['', '', 'B', 'B', 'B', 'B', '', '', '', ''],
      ['', 'C', '', '', '', '', '', '', '', ''],
      ['', 'C', '', 'o', '', '', '', '', '', ''],
      ['', 'C', '', '', '', '', '', '', '', ''],
      ['', 'C', '', '', 'S', 'S', 'S', '', '', 'D'],
      ['', 'C', '', '', '', '', '', '', '', 'D'],
      ['', '', '', '', '', '', '', '', '', 'D'],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', 'P', '', '', '', '', '', '', ''],
      ['', '', 'P', '', '', '', '', '', '', ''],
    ]);
  });

  test('second missed shot on fresh board', () => {
    newBoard.receiveAttack([8, 7]);

    expect(newBoard.board).toEqual([
      ['', '', 'B', 'B', 'B', 'B', '', '', '', ''],
      ['', 'C', '', '', '', '', '', '', '', ''],
      ['', 'C', '', 'o', '', '', '', '', '', ''],
      ['', 'C', '', '', '', '', '', '', '', ''],
      ['', 'C', '', '', 'S', 'S', 'S', '', '', 'D'],
      ['', 'C', '', '', '', '', '', '', '', 'D'],
      ['', '', '', '', '', '', '', '', '', 'D'],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', 'P', '', '', '', '', 'o', '', ''],
      ['', '', 'P', '', '', '', '', '', '', ''],
    ]);
  });

  test('successful hit on boat', () => {
    newBoard.receiveAttack([0, 2]);

    expect(newBoard.board).toEqual([
      ['', '', 'x', 'B', 'B', 'B', '', '', '', ''],
      ['', 'C', '', '', '', '', '', '', '', ''],
      ['', 'C', '', 'o', '', '', '', '', '', ''],
      ['', 'C', '', '', '', '', '', '', '', ''],
      ['', 'C', '', '', 'S', 'S', 'S', '', '', 'D'],
      ['', 'C', '', '', '', '', '', '', '', 'D'],
      ['', '', '', '', '', '', '', '', '', 'D'],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', 'P', '', '', '', '', 'o', '', ''],
      ['', '', 'P', '', '', '', '', '', '', ''],
    ]);

    newBoard.ships.forEach((ship) => {
      if (ship.symbol === 'B') {
        expect(ship.hits).toBe(1);
      }
    });
  });

  test('successfully sink boat', () => {
    newBoard.receiveAttack([4, 4]);
    newBoard.receiveAttack([4, 5]);
    newBoard.receiveAttack([4, 6]);

    expect(newBoard.board).toEqual([
      ['', '', 'x', 'B', 'B', 'B', '', '', '', ''],
      ['', 'C', '', '', '', '', '', '', '', ''],
      ['', 'C', '', 'o', '', '', '', '', '', ''],
      ['', 'C', '', '', '', '', '', '', '', ''],
      ['', 'C', '', '', 'x', 'x', 'x', '', '', 'D'],
      ['', 'C', '', '', '', '', '', '', '', 'D'],
      ['', '', '', '', '', '', '', '', '', 'D'],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', 'P', '', '', '', '', 'o', '', ''],
      ['', '', 'P', '', '', '', '', '', '', ''],
    ]);

    newBoard.ships.forEach((ship) => {
      if (ship.symbol === 'S') {
        expect(ship.isSunk).toBe(true);
      }
    });
  });

  test('successfully sink all boats', () => {
    newBoard.receiveAttack([0, 3]);
    newBoard.receiveAttack([0, 4]);
    newBoard.receiveAttack([0, 5]);

    newBoard.receiveAttack([1, 1]);
    newBoard.receiveAttack([2, 1]);
    newBoard.receiveAttack([3, 1]);
    newBoard.receiveAttack([4, 1]);
    newBoard.receiveAttack([5, 1]);

    newBoard.receiveAttack([4, 9]);
    newBoard.receiveAttack([5, 9]);
    newBoard.receiveAttack([6, 9]);

    newBoard.receiveAttack([8, 2]);
    newBoard.receiveAttack([9, 2]);

    expect(newBoard.board).toEqual([
      ['', '', 'x', 'x', 'x', 'x', '', '', '', ''],
      ['', 'x', '', '', '', '', '', '', '', ''],
      ['', 'x', '', 'o', '', '', '', '', '', ''],
      ['', 'x', '', '', '', '', '', '', '', ''],
      ['', 'x', '', '', 'x', 'x', 'x', '', '', 'x'],
      ['', 'x', '', '', '', '', '', '', '', 'x'],
      ['', '', '', '', '', '', '', '', '', 'x'],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', 'x', '', '', '', '', 'o', '', ''],
      ['', '', 'x', '', '', '', '', '', '', ''],
    ]);

    newBoard.ships.forEach((ship) => {
      expect(ship.isSunk).toBe(true);
    });
  });

  test('disallow shot on already missed coordinate', () => {
    expect(newBoard.receiveAttack([8, 7])[0]).toBe(
      'already targeted coordinate',
    );
  });

  test('disallow shot on already hit coordinate', () => {
    expect(newBoard.receiveAttack([1, 1])[0]).toBe(
      'already targeted coordinate',
    );
  });
});

describe('Gameboard - checkAllSunk', () => {
  const newBoard = new Gameboard(10);
  newBoard.placeShip('v', [1, 1], 'carrier');
  newBoard.placeShip('h', [0, 2], 'battleship');

  test('correct board setup', () => {
    expect(newBoard.board).toEqual([
      ['', '', 'B', 'B', 'B', 'B', '', '', '', ''],
      ['', 'C', '', '', '', '', '', '', '', ''],
      ['', 'C', '', '', '', '', '', '', '', ''],
      ['', 'C', '', '', '', '', '', '', '', ''],
      ['', 'C', '', '', '', '', '', '', '', ''],
      ['', 'C', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
    ]);
    expect(newBoard.ships).toHaveLength(2);
  });

  test('correctly report that all ships are NOT sunk', () => {
    expect(newBoard.checkAllSunk()).toBe(false);
  });

  test('correctly report the sinking of all ships', () => {
    newBoard.receiveAttack([0, 2]);
    newBoard.receiveAttack([0, 3]);
    newBoard.receiveAttack([0, 4]);
    newBoard.receiveAttack([0, 5]);

    newBoard.receiveAttack([1, 1]);
    newBoard.receiveAttack([2, 1]);
    newBoard.receiveAttack([3, 1]);
    newBoard.receiveAttack([4, 1]);
    newBoard.receiveAttack([5, 1]);

    expect(newBoard.checkAllSunk()).toBe(true);
  });
});
