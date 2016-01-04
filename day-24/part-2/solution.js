"use strict";

const Combinatorics = require('./combinatorics');
const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(Number);
const TOTAL_SUM = INPUT.reduce((total, x) => total + x, 0);
const GROUP_WEIGHT = TOTAL_SUM / 4;
const VALID_PACKAGES = [];

for (var i = 1; VALID_PACKAGES.length === 0; i++) {
  var combination = Combinatorics.combination(INPUT, ++i);
  var cmb;

  while (cmb = combination.next()) {
    if (cmb.reduce((acc, x) => acc + x) === GROUP_WEIGHT) VALID_PACKAGES.push(cmb);
  }
}

const result = VALID_PACKAGES.map(pkg => pkg.reduce((acc, x) => acc * x)).sort((a, b) => a - b)[0];

console.log(result);
