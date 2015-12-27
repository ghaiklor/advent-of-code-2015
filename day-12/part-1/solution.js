"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt', 'utf-8');

// I was thinking about parse and flatten all the data from INPUT, but read again the task, it says:
// "Your first job is to simply find all of the numbers throughout the document"
// Well, OK
const NUMBER_REGEX = /-?\d+/g;
const result = INPUT.match(NUMBER_REGEX).reduce((total, number) => total + +number, 0);

console.log(result);
