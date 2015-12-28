"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt').toString().split('\n');

// Part 1 was written with pure functions but Part 2 I've decided to write with Regex
const isContainPair = string => /([a-z][a-z]).*\1/.test(string);
const isContainRepeatLetter = string => /([a-z])[a-z]\1/.test(string);

const isNiceString = string => !!(isContainPair(string) && isContainRepeatLetter(string));

const result = INPUT.reduce((total, string) => isNiceString(string) ? ++total : total, 0);

console.log(result);
