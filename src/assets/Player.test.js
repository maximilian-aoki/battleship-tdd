import Player from './Player';

describe('Player constructor', () => {
  test('sets up correct board', () => {
    const newPlayer = new Player();
    expect(newPlayer.playerBoard.board).toEqual([
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
  });

  test('gets correct enemy coords arr on instantiation', () => {
    const newPlayer = new Player();
    expect(newPlayer.allCoords).toHaveLength(100);
  });
});

describe('placeShip', () => {
  test('puts ship on own board', () => {
    const player = new Player();

    player.placeShip('h', [1, 1], 'destroyer');

    expect(player.playerBoard.board).toEqual([
      ['', '', '', '', '', '', '', '', '', ''],
      ['', 'D', 'D', 'D', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
    ]);
  });
});

describe('attack', () => {
  test('sends attack through to enemy board', () => {
    const player = new Player();
    const enemy = new Player();

    player.attack(enemy, [1, 1]);

    expect(enemy.playerBoard.board).toEqual([
      ['', '', '', '', '', '', '', '', '', ''],
      ['', 'o', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
    ]);
  });
});

describe('randomAttack', () => {
  test('randomized computer attack based on set of available coordinates - MOCK', () => {
    const player = new Player();
    const enemy = new Player();
    enemy.placeShip('v', [0, 0], 'carrier');

    const mockRandomAttack1 = jest.fn(() => {
      const randomCoords = player.allCoords[0]; // should be [0,0]
      player.allCoords.splice(0, 1);

      if (player.attack(enemy, randomCoords)[0] === 'hit') {
        mockRandomAttack2();
      }
    });

    const mockRandomAttack2 = jest.fn(() => {
      const randomCoords = player.allCoords[1]; // should be [0,1]
      player.allCoords.splice(1, 1);

      player.attack(enemy, randomCoords);
    });

    mockRandomAttack1();
    expect(player.allCoords).toHaveLength(98);
  });

  test('check if real random attack function fires', () => {
    const player = new Player();
    const enemy = new Player();

    enemy.randomAttack(player);
    enemy.randomAttack(player);
    enemy.randomAttack(player);

    expect(enemy.allCoords).toHaveLength(97);
  });
});

describe('randomPlaceShips', () => {
  test('place all 5 ships', () => {
    const enemy = new Player();
    enemy.randomPlaceShips();

    expect(enemy.playerBoard.ships).toHaveLength(5);
  });
});
