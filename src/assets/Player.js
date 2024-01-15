import Gameboard from './Gameboard';

export default class Player {
  constructor() {
    this.playerBoard = new Gameboard(10);
    this.enemyCoords = this.#getAllCoords(10);
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
    this.playerBoard.placeShip(orientation, coordArr, boat);
  }

  attack(enemyPlayer, coordArr) {
    return enemyPlayer.playerBoard.receiveAttack(coordArr);
  }

  // computer random attack move
  randomAttack(enemyPlayer) {
    const randomIndex = Math.floor(Math.random() * this.enemyCoords.length);
    const randomCoords = this.enemyCoords[randomIndex];
    this.enemyCoords.splice(randomIndex, 1);

    if (this.attack(enemyPlayer, randomCoords) === 'hit') {
      this.randomAttack(enemyPlayer);
    }
  }
}
