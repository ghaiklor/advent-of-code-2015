"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const AUNT_REGEX = /Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/;
const SIGNATURE = {
  children: value => value == 3,
  cats: value => value > 7,
  samoyeds: value => value == 2,
  pomeranians: value => value < 3,
  akitas: value => value == 0,
  vizslas: value => value == 0,
  goldfish: value => value < 5,
  trees: value => value > 3,
  cars: value => value == 2,
  perfumes: value => value == 1
};

const result = INPUT.filter(item => {
  const parsed = item.match(AUNT_REGEX);

  return (
    SIGNATURE[parsed[2]](parsed[3]) &&
    SIGNATURE[parsed[4]](parsed[5]) &&
    SIGNATURE[parsed[6]](parsed[7])
  )
})[0].match(AUNT_REGEX)[1];

console.log(result);
