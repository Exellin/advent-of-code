import fs from 'fs';

const data = fs.readFileSync('day1/input.txt').toString('utf-8').split('\n');
const BATCH_LENGTH = 3;
let increases = 0;

const sum = (array: string[]) => {
  return array.reduce((total, entry) => {
    return total + Number(entry);
  }, 0);
};

for (let i=1; i < data.length; i++) {
  if (sum(data.slice(i, i + BATCH_LENGTH)) > sum(data.slice(i - 1, i - 1 + BATCH_LENGTH))) {
    increases++;
  }
}

console.log(increases);
