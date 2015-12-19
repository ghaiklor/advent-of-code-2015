"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt').toString().split('\n');
const result = INPUT.reduce((total, _lwh) => {
  const lwh = _lwh.split('x');
  const length = lwh[0];
  const width = lwh[1];
  const height = lwh[2];

  return total
    + (2 * length * width)
    + (2 * width * height)
    + (2 * height * length)
    + Math.min(length * width, width * height, height * length);
}, 0);

console.log(result);
