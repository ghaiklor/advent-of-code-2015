"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt').toString().replace(/\n/g, '');

let floor = 0;
let result = INPUT.split('').map(direction => direction === '(' ? ++floor : --floor).indexOf(-1) + 1;

console.log(result);
