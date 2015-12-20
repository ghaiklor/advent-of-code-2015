"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt').toString().split('\n');

// Parse command from string and return object
const parseCommand = _command => {
  let command = _command.match(/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/);
  return {command: command[1], x1: +command[2], y1: +command[3], x2: +command[4], y2: +command[5]};
};

// Map of our lights
let LIGHTS = new Uint8Array(1000 * 1000);

// Parse each command and toggle lights in our map
INPUT.forEach(_command => {
  let command = parseCommand(_command);

  for (let x = command.x1; x <= command.x2; x++) {
    for (let y = command.y1; y <= command.y2; y++) {
      let index = 1000 * x + y;

      if (command.command === 'turn on') LIGHTS[index] = 1;
      if (command.command === 'turn off') LIGHTS[index] = 0;
      if (command.command === 'toggle') LIGHTS[index] = LIGHTS[index] === 0 ? 1 : 0;
    }
  }
});

// Calculate all of enabled lights
const result = LIGHTS.reduce((total, light) => light === 0 ? total : ++total, 0);

console.log(result);