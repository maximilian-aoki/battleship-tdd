import Ship from './Ship';

describe('Ship', () => {
  test('instantiates correctly', () => {
    const newShip = new Ship(3);

    expect(newShip.length).toBe(3);
    expect(newShip.isSunk).toBe(false);
  });

  test('increases hit count if less than length', () => {
    const newShip = new Ship(3);
    newShip.hit();

    expect(newShip.hits).toBe(1);
    expect(newShip.isSunk).toBe(false);
  });

  test('sinks ship if hit count equals length', () => {
    const newShip = new Ship(3);
    newShip.hit();
    newShip.hit();
    newShip.hit();

    expect(newShip.hits).toBe(3);
    expect(newShip.isSunk).toBe(true);
  });

  test('blocks hit if already sunk', () => {
    const newShip = new Ship(2);
    newShip.hit();
    newShip.hit();
    newShip.hit();

    expect(newShip.hits).toBe(2);
    expect(newShip.isSunk).toBe(true);
  });
});
