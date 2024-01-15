import Gameboard from './Gameboard';

export default class Player {
  constructor() {
    this.playerBoard = new Gameboard(10);
  }

  placeShip(orientation, coordArr, boat) {
    this.playerBoard.placeShip(orientation, coordArr, boat);
  }

  attack(enemyPlayer, coordArr) {
    enemyPlayer.playerBoard.receiveAttack(coordArr);
  }
}
