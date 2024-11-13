import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day2/input.txt').toString('utf-8').split('\n');

let x = 0;
let depth = 0;
let aim = 0;

for (const dataPoint of data) {
  const [direction, magnitude] = dataPoint.split(' ');
  switch (direction) {
    case 'forward':
      x = x + Number(magnitude);
      depth = depth + (aim * Number(magnitude));
      break;
    case 'up':
      aim = aim - Number(magnitude);
      break;
    case 'down':
      aim = aim + Number(magnitude);
      break;
    default:
      console.log(`Invalid direction ${direction}`);
  }
}

console.log(x * depth);
