"use strict";

const fs = require('fs');
const NUMBER_REGEX = /-?\d+/g;
const INPUT = JSON.parse(fs.readFileSync('./input.txt', 'utf-8'), (key, value) => {
  if (!Array.isArray(value)) return Object.keys(value).map(key => value[key]).indexOf('red') !== -1 ? {} : value;
  return value;
});

const result = JSON.stringify(INPUT).match(NUMBER_REGEX).reduce((total, number) => total + +number, 0);

console.log(result);
