"use strict";

const INPUT = '1113122113';
const FIND_REPETITIONS_REGEX = /(\d)\1*/g;

const lookAndSay = input => input.match(FIND_REPETITIONS_REGEX).reduce((acc, char) => acc + `${char.length}${char[0]}`, '');

let result = INPUT;
for (let i = 0; i < 40; i++) {
  result = lookAndSay(result);
}

console.log(result.length);
