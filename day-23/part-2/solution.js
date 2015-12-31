"use strict";

const fs = require('fs');
const INPUT = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const SIMPLE_INSTRUCTION = /(hlf|tpl|inc) (\w+)/;
const SIMPLE_JUMP_INSTRUCTION = /(jmp) ([+-]\d+)/;
const CONDITIONAL_JUMP_INSTRUCTION = /(jie|jio) (\w+), ([+-]\d+)/;

const PROCESSOR = new Map([
  ['a', 1],
  ['b', 0]
]);

const MACRO_ASSEMBLER = {
  hlf: (_, value) => value / 2,
  tpl: (_, value) => value * 3,
  inc: (_, value)=> value + 1,
  jmp: offset => +offset,
  jie: (offset, register) => register % 2 === 0 ? +offset : 1,
  jio: (offset, register) => register === 1 ? +offset : 1
};

const parseInstruction = instruction => {
  let parsed;

  if (SIMPLE_INSTRUCTION.test(instruction)) parsed = instruction.match(SIMPLE_INSTRUCTION);
  if (SIMPLE_JUMP_INSTRUCTION.test(instruction)) parsed = instruction.match(SIMPLE_JUMP_INSTRUCTION);
  if (CONDITIONAL_JUMP_INSTRUCTION.test(instruction)) parsed = instruction.match(CONDITIONAL_JUMP_INSTRUCTION);

  return {
    instruction: parsed[1],
    register: isNaN(parseInt(parsed[2])) ? parsed[2] : null,
    offset: typeof parsed[3] === 'undefined' && parsed[1] === 'jmp' ? parsed[2] : parsed[3]
  }
};


let pointer = 0;
while (INPUT[pointer]) {
  const instruction = INPUT[pointer];
  const parsed = parseInstruction(instruction);

  if (['jmp', 'jie', 'jio'].indexOf(parsed.instruction) !== -1) {
    pointer += MACRO_ASSEMBLER[parsed.instruction](parsed.offset, PROCESSOR.get(parsed.register));
  } else {
    PROCESSOR.set(parsed.register, MACRO_ASSEMBLER[parsed.instruction](parsed.offset, PROCESSOR.get(parsed.register)));
    pointer++;
  }
}

const result = PROCESSOR.get('b');

console.log(result);
