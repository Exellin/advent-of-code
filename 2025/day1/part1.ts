import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day1/input.txt').toString('utf-8').split('\n').filter((line) => line)

let position = 50;
let zeroCount = 0;

for (const instruction of data) {
  const direction = instruction[0];
  const amount = Number(instruction.split(direction)[1]) % 100

  if (direction === 'L') {
    position -= amount
  } else if (direction === 'R') {
    position += amount
  }

  if (position < 0) {
    position += 100
  } else if (position > 99) {
    position -= 100
  }

  if (position === 0) {
    zeroCount++;
  }
}

console.log(zeroCount)
