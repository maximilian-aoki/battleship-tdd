import Gameboard from './Gameboard';

describe('Gameboard', () => {
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
});
