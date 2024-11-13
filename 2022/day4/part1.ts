import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day4/input.txt').toString('utf-8').split('\n');

let overlapped = 0;

for (const pair of data) {
  if (pair === '') { break; }
  const [section1, section2] = pair.split(',');
  const [minSection1, maxSection1] = section1.split('-').map((section) => Number(section));
  const [minSection2, maxSection2] = section2.split('-').map((section) => Number(section));

  if ((minSection1 >= minSection2 && maxSection1 <= maxSection2) || (minSection2 >= minSection1 && maxSection2 <= maxSection1)) {
    overlapped++;
  }
}

console.log(overlapped);
