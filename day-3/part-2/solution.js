"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt').toString().split('');
const santaDirections = INPUT.filter((item, index) => index % 2 === 0);
const roboSantaDirections = INPUT.filter((item, index) => index % 2 === 1);

const traverse = directions => {
  let visitedCoordinates = ['0x0'];
  let currentPosition = {x: 0, y: 0};

  directions.forEach(direction => {
    if (direction === '^') currentPosition.y++;
    if (direction === 'v') currentPosition.y--;
    if (direction === '>') currentPosition.x++;
    if (direction === '<') currentPosition.x--;

    visitedCoordinates.push(`${currentPosition.x}x${currentPosition.y}`);
  });

  return visitedCoordinates;
};

const result = new Set(traverse(santaDirections).concat(traverse(roboSantaDirections))).size;

console.log(result);
