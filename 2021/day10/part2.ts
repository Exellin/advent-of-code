import fs from 'fs';

const data = fs.readFileSync('day10/input.txt').toString('utf-8').split('\n');
const POINT_VALUE: {[key: string]: number} = {
 ')': 1,
 ']': 2,
 '}': 3,
 '>': 4,
};
const CLOSING_BRACKET_MAP: {[key: string]: string} = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
};
const OPENING_BRACKET_MAP: {[key: string]: string} = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};
const incompleteLineScores = [];

for (const row of data) {
  const stack = [];
  const characters = Array.from(row);
  let corrupted = false;

  for (let i=0; i<characters.length; i++) {
    const character = characters[i];

    if (Object.values(CLOSING_BRACKET_MAP).includes(character)) {
      stack.push(character);
    } else {

      if (stack[stack.length - 1] !== CLOSING_BRACKET_MAP[character]) {
        corrupted = true;
        break;
      } else {
        stack.splice(stack.length - 1, 1);
      }
    }
  }

  if (!corrupted && stack.length > 0) {
    const neededCompletionCharacters = stack.reverse().map((charcter) => OPENING_BRACKET_MAP[charcter]);
    let score = 0;
    for (const character of neededCompletionCharacters) {
      score *= 5;
      score += POINT_VALUE[character];
    }
    incompleteLineScores.push(score);
  }
}

incompleteLineScores.sort((a, b) => a - b);
const finalScore = incompleteLineScores[Math.floor(incompleteLineScores.length / 2)];

console.log(`The final score is ${finalScore}`);
