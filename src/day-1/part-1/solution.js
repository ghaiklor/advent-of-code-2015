"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt').toString().replace(/\n/g, '');
const result = INPUT.split('').reduce((floor, direction) => direction === '(' ? ++floor : --floor, 0);

console.log(result);
