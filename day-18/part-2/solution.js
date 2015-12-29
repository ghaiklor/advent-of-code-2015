"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt', 'utf-8').split(/\n|/);
const WIDTH = 100;
const HEIGHT = 100;

class Grid {
  constructor(width, height, cells) {
    this.width = width;
    this.height = height;
    this.cells = cells;
    this.onSymbol = '#';
    this.offSymbol = '.';

    this.cells[0] = '#';
    this.cells[this.width - 1] = '#';
    this.cells[this.width * this.height - this.width] = '#';
    this.cells[this.width * this.height - 1] = '#';
  }

  getCell(x, y) {
    return this.cells[this.width * y + x];
  }

  setCell(x, y, value) {
    this.cells[this.width * y + x] = value;
    return this;
  }

  toggleCell(x, y) {
    return this.setCell(x, y, !this.isOn(x, y));
  }

  isOn(x, y) {
    return this.getCell(x, y) === this.onSymbol;
  }

  isOff(x, y) {
    return this.getCell(x, y) === this.offSymbol;
  }

  isInGrid(x, y) {
    return (x >= 0 && x < this.width && y >= 0 && y < this.height);
  }

  getNeighboursCount(x, y) {
    let count = this.isOn(x, y) ? -1 : 0;

    for (let yD = 0; yD < 3; yD++) {
      for (let xD = 0; xD < 3; xD++) {
        if (this.isInGrid(x + xD - 1, y + yD - 1) && this.isOn(x + xD - 1, y + yD - 1)) {
          count++;
        }
      }
    }

    return count;
  }

  tick() {
    let cells = new Array(this.width * this.height).fill(this.offSymbol);

    cells[0] = '#';
    cells[this.width - 1] = '#';
    cells[this.width * this.height - this.width] = '#';
    cells[this.width * this.height - 1] = '#';

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let onLightsCount = this.getNeighboursCount(x, y);

        if (this.isOn(x, y)) {
          if (onLightsCount === 2 || onLightsCount === 3) {
            cells[this.width * y + x] = this.onSymbol;
          }
        } else if (onLightsCount === 3) {
          cells[this.width * y + x] = this.onSymbol;
        }
      }
    }

    this.cells = cells;
  }

  render() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        process.stdout.write(this.isOn(x, y) ? this.onSymbol : this.offSymbol);
      }

      process.stdout.write('\n');
    }
  }
}

let grid = new Grid(WIDTH, HEIGHT, INPUT);
for (let i = 0; i < 100; i++) grid.tick();

const result = grid.cells.reduce((total, cell) => cell === '#' ? ++total : total, 0);

console.log(result);
