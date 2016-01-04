"use strict";

const ROW = 3010;
const COLUMN = 3019;
const FIRST_CODE = 20151125;
const TARGET_INDEX = ((Math.pow(ROW + COLUMN - 1, 2) + ROW + COLUMN - 1) / 2) - ((ROW + COLUMN - 1) - COLUMN);

let result = FIRST_CODE;
for (var i = 1; i < TARGET_INDEX; i++) {
  result = (result * 252533) % 33554393;
}

console.log(result);
