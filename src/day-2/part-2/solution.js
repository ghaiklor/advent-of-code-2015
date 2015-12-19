"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt').toString().split('\n');
const result = INPUT.reduce((total, _lwh) => {
  const lwh = _lwh.split('x').map(Number).sort((a, b) => a - b);

  return total
    + (lwh[0] + lwh[0] + lwh[1] + lwh[1])
    + (lwh[0] * lwh[1] * lwh[2])
}, 0);

console.log(result);
