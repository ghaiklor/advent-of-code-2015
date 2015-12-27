"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const REINDEER_REGEX = /\d+/g;
const TIME = 2503;

// It can be calculated by formula without cycling it in some kind of loop
const getReindeerDistance = input => {
  const args = input.match(REINDEER_REGEX).map(Number);
  const speed = args[0];
  const time = args[1];
  const rest = args[2];

  return Math.ceil(TIME / (time + rest)) * (speed * time);
};

const result = INPUT.reduce((max, reindeer) => getReindeerDistance(reindeer) > max ? getReindeerDistance(reindeer) : max, 0);

console.log(result);
