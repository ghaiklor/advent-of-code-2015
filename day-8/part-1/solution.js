"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const result = INPUT.reduce((acc, line) => acc + (line.length - eval(line).length), 0);

console.log(result);
