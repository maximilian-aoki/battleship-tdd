import Ship from './Ship';

export default class Gameboard {
  constructor(size) {
    this.board = this.#createBoard(size);
    this.size = size;
    this.ships = [];
  }

  // private function for instantiating game board with given size
  #createBoard(size) {
    const newBoard = [];
    for (let i = 0; i < size; i += 1) {
      const newRow = [];
      for (let j = 0; j < size; j += 1) {
        newRow.push('');
      }
      newBoard.push(newRow);
    }

    return newBoard;
  }

  placeShip(orientation, coordArr, boat) {
    const [boatLength, boatSymbol] = this.#getBoatLength(boat);

    if (
      this.#isBoardConflict(orientation, coordArr, boatLength) ||
      this.#isShipConflict(orientation, coordArr, boatLength)
    ) {
      return 'illegal move';
    }

    this.ships.push(new Ship(boatLength));
    this.#renderToBoard(orientation, coordArr, boatLength, boatSymbol);
  }

  // private function for translating ship specs to length and symbol
  #getBoatLength(boat) {
    if (boat === 'carrier') {
      return [5, 'C'];
    }
    if (boat === 'battleship') {
      return [4, 'B'];
    }
    if (boat === 'destroyer') {
      return [3, 'D'];
    }
    if (boat === 'submarine') {
      return [3, 'S'];
    }
    if (boat === 'patrol') {
      return [2, 'P'];
    }
    throw new Error('improper boat name format');
  }

  // private function for checking if ship placement is beyond board
  #isBoardConflict(orientation, coordArr, boatLength) {
    if (orientation === 'h') {
      return coordArr[1] + (boatLength - 1) >= this.size;
    }
    if (orientation === 'v') {
      return coordArr[0] + (boatLength - 1) >= this.size;
    }
  }

  // private function for checking if ships overlap
  #isShipConflict(orientation, coordArr, boatLength) {
    if (orientation === 'h') {
      const row = coordArr[0];
      for (let col = coordArr[1]; col < coordArr[1] + boatLength; col += 1) {
        if (this.board[row][col] !== '') {
          return true;
        }
      }
    }
    if (orientation === 'v') {
      const col = coordArr[1];
      for (let row = coordArr[0]; row < coordArr[0] + boatLength; row += 1) {
        if (this.board[row][col] !== '') {
          return true;
        }
      }
    }
  }

  // private function to add ship symbols to board on successful placement
  #renderToBoard(orientation, coordArr, boatLength, boatSymbol) {
    if (orientation === 'h') {
      const row = coordArr[0];
      for (let col = coordArr[1]; col < coordArr[1] + boatLength; col += 1) {
        this.board[row][col] = boatSymbol;
      }
    }
    if (orientation === 'v') {
      const col = coordArr[1];
      for (let row = coordArr[0]; row < coordArr[0] + boatLength; row += 1) {
        this.board[row][col] = boatSymbol;
      }
    }
  }

  receiveAttack(coordArr) {}
}
