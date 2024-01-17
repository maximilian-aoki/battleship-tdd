import Gameboard from './Gameboard';

export default class Player {
  constructor() {
    this.playerBoard = new Gameboard(10);
    this.allCoords = this.#getAllCoords(10);
  }

  #getAllCoords(size) {
    const arr = [];
    for (let i = 0; i < size; i += 1) {
      for (let j = 0; j < size; j += 1) {
        arr.push([i, j]);
      }
    }
    return arr;
  }

  placeShip(orientation, coordArr, boat) {
    return this.playerBoard.placeShip(orientation, coordArr, boat);
  }

  attack(enemyPlayer, coordArr) {
    return enemyPlayer.playerBoard.receiveAttack(coordArr);
  }

  // computer random attack move
  randomAttack(enemyPlayer) {
    const randomIndex = Math.floor(Math.random() * this.allCoords.length);
    const randomCoords = this.allCoords[randomIndex];
    this.allCoords.splice(randomIndex, 1);

    if (this.attack(enemyPlayer, randomCoords)[0] === 'hit') {
      this.randomAttack(enemyPlayer);
    }
  }

  // computer random ship placement
  randomPlaceShips() {
    const shipOptions = [
      'carrier',
      'battleship',
      'destroyer',
      'submarine',
      'patrol',
    ];
    shipOptions.forEach((shipType) => {
      this.#randomPlace(shipType);
    });
  }

  #randomPlace(shipType) {
    const randomOrientation = ['v', 'h'][Math.floor(Math.random() * 2)];
    const randomCoords = this.allCoords[Math.floor(Math.random() * 100)];

    if (
      this.placeShip(randomOrientation, randomCoords, shipType) ===
      'illegal move'
    ) {
      this.#randomPlace(shipType);
    }
  }
}
