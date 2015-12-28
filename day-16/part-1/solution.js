"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const AUNT_REGEX = /Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/;
const SIGNATURE = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1
};

const result = INPUT.filter(item => {
  const parsed = item.match(AUNT_REGEX);

  return (
    SIGNATURE[parsed[2]] == parsed[3] &&
    SIGNATURE[parsed[4]] == parsed[5] &&
    SIGNATURE[parsed[6]] == parsed[7]
  )
})[0].match(AUNT_REGEX)[1];

console.log(result);
