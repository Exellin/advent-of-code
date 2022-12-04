import fs from 'fs';

const data = fs.readFileSync('day4/input.txt').toString('utf-8').split('\n');

let overlapped = 0;

for (const pair of data) {
  if (pair === '') { break; }
  const [section1, section2] = pair.split(',');
  const [minSection1, maxSection1] = section1.split('-').map((section) => Number(section));
  const [minSection2, maxSection2] = section2.split('-').map((section) => Number(section));

  if (maxSection1 < minSection2 || minSection1 > maxSection2) {
    console.log(`${pair} does not overlap`);
  } else {
    console.log(`${pair} overlaps`);
    overlapped++;
  }
}

console.log(overlapped);
