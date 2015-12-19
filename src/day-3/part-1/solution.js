"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt').toString().split('');

// Starting location of the Santa
let coordinates = new Set().add(`0x0`);

INPUT.reduce((curCoords, direction) => {
  let newCoords = {};

  if (direction === '^') newCoords = {x: curCoords.x, y: curCoords.y + 1};
  if (direction === 'v') newCoords = {x: curCoords.x, y: curCoords.y - 1};
  if (direction === '>') newCoords = {x: curCoords.x + 1, y: curCoords.y};
  if (direction === '<') newCoords = {x: curCoords.x - 1, y: curCoords.y};

  coordinates.add(`${newCoords.x}x${newCoords.y}`);
  return newCoords;
}, {x: 0, y: 0});

console.log(coordinates.size);
