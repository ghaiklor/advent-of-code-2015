"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt', 'utf-8');
const REPLACEMENTS = INPUT.split('\n\n')[0].split('\n').reduce((map, r) => map.set(r.split(' => ')[1], r.split(' => ')[0]), new Map());

let MOLECULE = INPUT.split('\n\n')[1];
let count = 0;

while (MOLECULE !== 'e') {
  const randomMolecule = Array.from(REPLACEMENTS.keys())[Math.round(Math.random() * REPLACEMENTS.size)];

  MOLECULE = MOLECULE.replace(randomMolecule, match => {
    count++;
    return REPLACEMENTS.get(match);
  });

  console.log(`${MOLECULE} -> ${count}`);
}
