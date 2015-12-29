"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt', 'utf-8');
const REPLACEMENTS = INPUT.split('\n\n')[0].split('\n');
const MOLECULE = INPUT.split('\n\n')[1];
const ALL_MOLECULES = new Set();

REPLACEMENTS.forEach(replacement => {
  const from = replacement.split(' => ')[0];
  const to = replacement.split(' => ')[1];
  const findRegex = new RegExp(from, 'g');
  const replaceRegex = new RegExp(from);

  let match;
  while (match = findRegex.exec(MOLECULE)) {
    ALL_MOLECULES.add(MOLECULE.slice(0, match.index) + MOLECULE.slice(match.index).replace(replaceRegex, to));
  }
});

console.log(ALL_MOLECULES.size);
