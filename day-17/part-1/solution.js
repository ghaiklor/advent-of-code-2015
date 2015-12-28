"use strict";

const Combinatorics = require('./combinatorics');
const CONTAINERS = [11, 30, 47, 31, 32, 36, 3, 1, 5, 3, 32, 36, 15, 11, 46, 26, 28, 1, 19, 3];

let total = 0;

for (let i = 1; i < CONTAINERS.length - 1; i++) {
  let combination = Combinatorics.combination(CONTAINERS, i);
  let c = [];

  while (c = combination.next()) {
    if (c.reduce((a, b) => a + b) === 150) total++;
  }
}

console.log(total);
