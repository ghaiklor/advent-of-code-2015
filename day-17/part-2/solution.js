"use strict";

const Combinatorics = require('./combinatorics');
const CONTAINERS = [11, 30, 47, 31, 32, 36, 3, 1, 5, 3, 32, 36, 15, 11, 46, 26, 28, 1, 19, 3].sort((a, b) => b - a);
const MIN_COUNT = 4;

let total = 0;

let combination = Combinatorics.combination(CONTAINERS, MIN_COUNT);
let c;

while (c = combination.next()) {
  if (c.reduce((a, b) => a + b) === 150) total++;
}

console.log(total);
