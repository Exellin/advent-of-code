import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day10/input.txt').toString('utf-8').split('\n');
const POINT_VALUE: {[key: string]: number} = {
 ')': 3,
 ']': 57,
 '}': 1197,
 '>': 25137,
};
const BRACKET_MAP: {[key: string]: string} = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
};

let score = 0;

for (const row of data) {
  const stack = [];
  const characters = Array.from(row);

  for (let i=0; i<characters.length; i++) {
    const character = characters[i];

    if (Object.values(BRACKET_MAP).includes(character)) {
      stack.push(character);
    } else {

      if (stack[stack.length - 1] !== BRACKET_MAP[character]) {
        score += POINT_VALUE[character];
        break;
      } else {
        stack.splice(stack.length - 1, 1);
      }
    }
  }
}

console.log(`The total score for illegal characters is ${score}`);
