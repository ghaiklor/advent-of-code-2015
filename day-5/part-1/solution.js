"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt').toString().split('\n');

// Dictionary of letters that need to be checked against the rules
const VOWELS = ['a', 'e', 'i', 'o', 'u'];
const DOUBLE_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('').map(item => item + item);
const RESTRICTED_LETTERS = ['ab', 'cd', 'pq', 'xy'];

// Methods to check the rules
const isContainThreeVowels = string => string.split('').reduce((vowels, char) => VOWELS.indexOf(char) === -1 ? vowels : ++vowels, 0) >= 3;
const isContainDoubleLetter = string => DOUBLE_LETTERS.some(item => string.indexOf(item) !== -1);
const isContainRestrictedLetters = string => RESTRICTED_LETTERS.some(item => string.indexOf(item) !== -1);

const isNiceString = string => !!(isContainThreeVowels(string) && isContainDoubleLetter(string) && !isContainRestrictedLetters(string));

// Result is a composition of all methods above
const result = INPUT.reduce((total, string) => isNiceString(string) ? ++total : total, 0);

console.log(result);