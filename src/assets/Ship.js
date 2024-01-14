export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.isSunk = false;
  }

  hit() {
    if (this.isSunk === false) {
      this.hits += 1;
      this.isSunk = this.hits >= this.length;
    }
  }
}
