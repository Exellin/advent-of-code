import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day1/input.txt').toString('utf-8').split('\n');
const elves: number[] = [0];

for (const calorieCount of data) {
  if (calorieCount !== '') {
    elves[elves.length - 1] += Number(calorieCount);
  } else {
    elves.push(0);
  }
}

console.log(Math.max(...elves));
