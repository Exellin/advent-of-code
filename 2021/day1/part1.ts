import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day1/input.txt').toString('utf-8').split('\n');
let increases = 0;

for (let i=1; i < data.length; i++) {
  if (Number(data[i]) > Number(data[i - 1])) {
    increases++;
  }
}

console.log(increases);
