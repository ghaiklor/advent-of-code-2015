"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const result = INPUT.reduce((acc, line) => acc + (2 + line.replace(/\\/g, '\\\\').replace(/"/g, '\\"').length - line.length), 0);

console.log(result);
