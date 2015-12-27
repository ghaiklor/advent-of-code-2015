"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const REINDEER_NAME_REGEX = /^\w+/;
const REINDEER_ARGS_REGEX = /\d+/g;
const REINDEER_POINTS = new Map();
const TIME = 2503;

// Get reindeer name from input
const getReindeerName = input => input.match(REINDEER_NAME_REGEX)[0];

// Calculates distance for one of the reindeer from 0 to 2503 seconds
function* getReindeerDistanceIterator(input) {
  const args = input.match(REINDEER_ARGS_REGEX).map(Number);
  const speed = args[0];
  const time = args[1];
  const rest = args[2];

  let currentDistance = 0;

  for (let currentTime = 0; currentTime <= TIME; currentTime++) {
    let isMoving = (currentTime % (time + rest) <= time) && (currentTime % (time + rest) !== 0);
    yield isMoving ? currentDistance += speed : currentDistance;
  }
}

// Makes map of all distances for all reindeer
const allTraveledDistances = INPUT.reduce((map, reindeer) => map.set(getReindeerName(reindeer), Array.from(getReindeerDistanceIterator(reindeer))), new Map());

// Start gathering winners for each second
for (let currentTime = 0; currentTime <= TIME; currentTime++) {
  let winnerInTheRound = '';
  let max = 0;

  for (let reindeerName of allTraveledDistances.keys()) {
    let reindeerTraveled = allTraveledDistances.get(reindeerName)[currentTime];

    if (reindeerTraveled >= max) {
      winnerInTheRound = reindeerName;
      max = reindeerTraveled;
    }
  }

  REINDEER_POINTS.set(winnerInTheRound, (REINDEER_POINTS.get(winnerInTheRound) || 0) + 1);
}

// Calculate the winner and points
const result = Math.max.apply(Math, Array.from(REINDEER_POINTS.values()));

console.log(result);
