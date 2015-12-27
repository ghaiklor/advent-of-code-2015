"use strict";

// I'm the laziest man in the world, I know :) Just changed INPUT to the password from part-1
const INPUT = 'cqjxxyzz';

// Rules for correct password
const isContainStraightIncreasingSymbols = string => string.split('').map(char => char.charCodeAt(0)).some((char, index, arr) => arr[index] === arr[index + 1] - 1 && arr[index + 1] === arr[index + 2] - 1);
const isContainRestrictedSymbols = string => /i|o|l/.test(string);
const isContainPairs = string => /(\w)\1.*(\w)\2/.test(string);

// Increments one char
const incrementChar = char => char === 'z' ? 'a' : String.fromCharCode(char.charCodeAt(0) + 1);

// Increments the whole string by one char recursively
const incrementString = string => {
  const nextChar = incrementChar(string.slice(-1));
  return nextChar === 'a' ? incrementString(string.slice(0, -1)) + 'a' : string.slice(0, -1) + nextChar;
};

// Checks if password is valid (based on rules above)
const isValidPassword = string => isContainStraightIncreasingSymbols(string) && !isContainRestrictedSymbols(string) && isContainPairs(string);

// Our input is valid now, so increment it right now
let result = incrementString(INPUT);
while (!isValidPassword(result)) result = incrementString(result);

console.log(result);
